"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { categories, prices, times } from "@/data/foods";
import type { Food } from "@/data/foods";
import { getCategory, getPrice, getTime } from "@/lib/helper";
import AdminSearch from "@/components/admin/AdminSearch";
import ui from "@/app/styles/admin-ui.module.css";
import styles from "@/app/styles/admin-dashboard.module.css";

const foodKosong: Food = {
  id: "",
  name: "",
  image: "/img/Rawon.jpg",
  shortDescription: "",
  story: "",
  ingredients: [],
  taste: "",
  categories: [],
  priceCategory: "hemat",
  priceRange: "",
  timeCategory: [],
  featured: false,
};

export default function FoodTable() {
  const [list, setList] = useState<Food[]>([]);
  const [keyword, setKeyword] = useState("");
  const [form, setForm] = useState<Food>(foodKosong);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  async function loadFoods() {
    const response = await fetch("/api/foods");
    if (response.ok) setList(await response.json());
  }

  useEffect(() => {
    loadFoods();
  }, []);

  const filteredFoods = list.filter((food) =>
    food.name.toLowerCase().includes(keyword.toLowerCase().trim()),
  );
  const emptyText = list.length === 0 ? "Belum ada data makanan." : "Makanan tidak ditemukan.";

  function startAdd() {
    setForm(foodKosong);
    setError("");
    setOpen(true);
  }

  function startEdit(food: Food) {
    setForm(food);
    setError("");
    setOpen(true);
  }

  async function saveFood(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const response = await fetch(form.id ? `/api/foods/${form.id}` : "/api/foods", {
      method: form.id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      const result = await response.json();
      setError(result.message ?? "Data makanan gagal disimpan.");
      return;
    }

    setOpen(false);
    await loadFoods();
  }

  async function deleteFood(id: string) {
    if (!window.confirm("Hapus makanan ini?")) return;

    const response = await fetch(`/api/foods/${id}`, { method: "DELETE" });
    if (response.ok) await loadFoods();
  }

  function updateList(field: "categories" | "timeCategory", id: string, checked: boolean) {
    const values = form[field];
    setForm({
      ...form,
      [field]: checked ? [...values, id] : values.filter((value) => value !== id),
    });
  }

  return (
    <>
      <div className={ui.panel}>
        <div className={`d-flex flex-wrap align-items-center justify-content-between ${styles.toolbar}`}>
          <AdminSearch
            value={keyword}
            onChange={setKeyword}
            placeholder="Cari nama makanan..."
            label="Cari makanan"
          />
          <div className="d-flex align-items-center gap-3">
            <span className={styles.count}>{filteredFoods.length} makanan</span>
            <Button className={`${ui.btn} ${ui.btnPrimary}`} onClick={startAdd}>+ Tambah Makanan</Button>
          </div>
        </div>

        <div className={styles.tableWrap}>
          <table className={`w-100 ${styles.table}`}>
            <thead>
              <tr>
                <th scope="col">Makanan</th>
                <th scope="col">Kategori</th>
                <th scope="col">Harga</th>
                <th scope="col">Waktu</th>
                <th scope="col" className="text-end">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredFoods.length === 0 ? (
                <tr><td colSpan={5} className={styles.tableEmpty}>{emptyText}</td></tr>
              ) : filteredFoods.map((food) => (
                <tr key={food.id}>
                  <td className={styles.cellMain} data-label="Makanan">
                    <div className={`d-flex align-items-center ${styles.cellFood}`}>
                      <Image src={food.image} alt="" width={54} height={54} className={styles.cellImg} />
                      <div>
                        <strong className={styles.cellName}>{food.name}</strong>
                        {food.featured && <span className={styles.featured}>★ Pilihan Beranda</span>}
                        <small className={styles.cellDesc}>{food.shortDescription}</small>
                      </div>
                    </div>
                  </td>
                  <td data-label="Kategori">
                    <div className={`d-flex flex-wrap justify-content-end justify-content-md-start ${ui.tagList}`}>
                      {food.categories.map((id) => {
                        const category = getCategory(id);
                        return <span className={ui.tag} key={id}>{category ? `${category.icon} ${category.label}` : id}</span>;
                      })}
                    </div>
                  </td>
                  <td data-label="Harga">
                    <div>
                      <span className={`${ui.tag} ${ui.tagOrange}`}>{getPrice(food.priceCategory)?.label}</span>
                      <small className={styles.cellSub}>{food.priceRange}</small>
                    </div>
                  </td>
                  <td data-label="Waktu">{food.timeCategory.map((id) => getTime(id)?.label ?? id).join(", ")}</td>
                  <td data-label="Aksi" className="text-end">
                    <div className={`d-flex justify-content-end ${ui.rowActions}`}>
                      <button type="button" className={`d-inline-flex align-items-center justify-content-center ${ui.iconBtn}`} title="Edit" aria-label={`Edit ${food.name}`} onClick={() => startEdit(food)}>
                        <i className="fa-solid fa-pen"></i>
                      </button>
                      <button type="button" className={`d-inline-flex align-items-center justify-content-center ${ui.iconBtn} ${ui.iconBtnDanger}`} title="Hapus" aria-label={`Hapus ${food.name}`} onClick={() => deleteFood(food.id)}>
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal show={open} onHide={() => setOpen(false)} centered size="lg">
        <Form onSubmit={saveFood}>
          <Modal.Header closeButton>
            <Modal.Title>{form.id ? "Edit Makanan" : "Tambah Makanan"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group className={ui.field}>
              <Form.Label>Nama makanan</Form.Label>
              <Form.Control required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </Form.Group>
            <Form.Group className={ui.field}>
              <Form.Label>Alamat gambar</Form.Label>
              <Form.Control value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
            </Form.Group>
            <Form.Group className={ui.field}>
              <Form.Label>Deskripsi singkat</Form.Label>
              <Form.Control as="textarea" rows={2} value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} />
            </Form.Group>
            <Form.Group className={ui.field}>
              <Form.Label>Cerita makanan</Form.Label>
              <Form.Control as="textarea" rows={2} value={form.story} onChange={(e) => setForm({ ...form, story: e.target.value })} />
            </Form.Group>
            <Form.Group className={ui.field}>
              <Form.Label>Bahan (pisahkan dengan koma)</Form.Label>
              <Form.Control value={form.ingredients.join(", ")} onChange={(e) => setForm({ ...form, ingredients: e.target.value.split(",").map((item) => item.trim()).filter(Boolean) })} />
            </Form.Group>
            <Form.Group className={ui.field}>
              <Form.Label>Rasa</Form.Label>
              <Form.Control value={form.taste} onChange={(e) => setForm({ ...form, taste: e.target.value })} />
            </Form.Group>
            <Form.Group className={ui.field}>
              <Form.Label>Kategori harga</Form.Label>
              <Form.Select value={form.priceCategory} onChange={(e) => setForm({ ...form, priceCategory: e.target.value })}>
                {prices.map((price) => <option key={price.id} value={price.id}>{price.label}</option>)}
              </Form.Select>
            </Form.Group>
            <Form.Group className={ui.field}>
              <Form.Label>Rentang harga</Form.Label>
              <Form.Control required value={form.priceRange} onChange={(e) => setForm({ ...form, priceRange: e.target.value })} />
            </Form.Group>
            <Form.Group className={ui.field}>
              <Form.Label>Kategori</Form.Label>
              {categories.map((category) => <Form.Check key={category.id} type="checkbox" label={`${category.icon} ${category.label}`} checked={form.categories.includes(category.id)} onChange={(e) => updateList("categories", category.id, e.target.checked)} />)}
            </Form.Group>
            <Form.Group className={ui.field}>
              <Form.Label>Waktu penyajian</Form.Label>
              {times.map((time) => <Form.Check key={time.id} type="checkbox" label={`${time.icon} ${time.label}`} checked={form.timeCategory.includes(time.id)} onChange={(e) => updateList("timeCategory", time.id, e.target.checked)} />)}
            </Form.Group>
            <Form.Check type="checkbox" label="Tampilkan sebagai pilihan beranda" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setOpen(false)}>Batal</Button>
            <Button type="submit" className={`${ui.btn} ${ui.btnPrimary}`}>Simpan</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
