"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import type { Food, Warung } from "@/data/foods";
import { findFood, formatTime, isWarungOpen } from "@/lib/helper";
import AdminSearch from "@/components/admin/AdminSearch";
import ui from "@/app/styles/admin-ui.module.css";
import styles from "@/app/styles/admin-dashboard.module.css";

type Props = { addRequest: number };

const warungKosong: Warung = {
  id: "",
  name: "",
  address: "",
  openDays: "",
  openTime: "",
  closeTime: "",
  description: "",
  foodIds: [],
  otherMenu: [],
  image: "/img/Warung.png",
  mapsUrl: "",
};

export default function WarungTable({ addRequest }: Props) {
  const [list, setList] = useState<Warung[]>([]);
  const [foodOptions, setFoodOptions] = useState<Food[]>([]);
  const [keyword, setKeyword] = useState("");
  const [form, setForm] = useState<Warung>(warungKosong);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [tableError, setTableError] = useState("");

  async function loadWarungs() {
    const response = await fetch("/api/warungs");
    if (!response.ok) {
      setTableError("Data warung gagal dimuat.");
      return;
    }

    setList(await response.json());
    setTableError("");
  }

  async function loadFoods() {
    const response = await fetch("/api/foods");
    if (response.ok) setFoodOptions(await response.json());
  }

  useEffect(() => {
    loadWarungs();
    loadFoods();
  }, []);

  useEffect(() => {
    if (addRequest > 0) startAdd();
  }, [addRequest]);

  const filteredWarungs = list.filter((warung) =>
    warung.name.toLowerCase().includes(keyword.toLowerCase().trim()),
  );
  const emptyText = list.length === 0 ? "Belum ada data warung." : "Warung tidak ditemukan.";

  function startAdd() {
    setForm(warungKosong);
    setError("");
    setOpen(true);
  }

  function startEdit(warung: Warung) {
    setForm({ ...warung });
    setError("");
    setOpen(true);
  }

  async function saveWarung(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const response = await fetch(form.id ? `/api/warungs/${form.id}` : "/api/warungs", {
      method: form.id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      const result = await response.json();
      setError(result.message ?? "Data warung gagal disimpan.");
      return;
    }

    setOpen(false);
    await loadWarungs();
  }

  async function deleteWarung(id: string) {
    if (!window.confirm("Hapus warung ini?")) return;

    const response = await fetch(`/api/warungs/${id}`, { method: "DELETE" });
    if (response.ok) {
      setTableError("");
      await loadWarungs();
    } else {
      const result = await response.json();
      setTableError(result.message ?? "Warung gagal dihapus.");
    }
  }

  function updateList(field: "foodIds" | "otherMenu", id: string, checked: boolean) {
    const values = form[field];
    setForm({
      ...form,
      [field]: checked ? [...values, id] : values.filter((value) => value !== id),
    });
  }

  return (
    <>
      {tableError && <Alert variant="danger">{tableError}</Alert>}
      <div className={ui.panel}>
        <div className={`d-flex flex-wrap align-items-center justify-content-between ${styles.toolbar}`}>
          <AdminSearch
            value={keyword}
            onChange={setKeyword}
            placeholder="Cari nama warung..."
            label="Cari warung"
          />
          <span className={styles.count}>{filteredWarungs.length} warung</span>
        </div>

        <div className={styles.tableWrap}>
          <table className={`w-100 ${styles.table}`}>
            <thead>
              <tr>
                <th scope="col">Warung</th>
                <th scope="col">Jam Buka</th>
                <th scope="col">Menu</th>
                <th scope="col">Status</th>
                <th scope="col" className="text-end">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredWarungs.length === 0 ? (
                <tr><td colSpan={5} className={styles.tableEmpty}>{emptyText}</td></tr>
              ) : filteredWarungs.map((warung) => (
                <tr key={warung.id}>
                  <td className={styles.cellMain} data-label="Warung">
                    <div className={`d-flex align-items-center ${styles.cellFood}`}>
                      <Image src={warung.image} alt="" width={54} height={54} className={styles.cellImg} />
                      <div>
                        <strong className={styles.cellName}>{warung.name}</strong>
                        <small className={styles.cellDesc}>{warung.address}</small>
                      </div>
                    </div>
                  </td>
                  <td data-label="Jam Buka">
                    <div className={styles.cellTime}>
                      <strong>{formatTime(warung.openTime)} – {formatTime(warung.closeTime)}</strong>
                      <small className={styles.cellSub}>{warung.openDays}</small>
                    </div>
                  </td>
                  <td data-label="Menu">
                    <div className={`d-flex flex-wrap justify-content-end justify-content-md-start ${ui.tagList}`}>
                      {warung.foodIds.map((id) => (
                        <span className={`${ui.tag} ${ui.tagGray}`} key={id}>{findFood(id)?.name ?? id}</span>
                      ))}
                      {warung.otherMenu.map((item) => (
                        <span className={`${ui.tag} ${ui.tagGray}`} key={item}>{item}</span>
                      ))}
                    </div>
                  </td>
                  <td data-label="Status">
                    {isWarungOpen(warung) ? (
                      <span className={`${ui.tag} ${ui.tagGreen}`}>● Buka</span>
                    ) : (
                      <span className={`${ui.tag} ${ui.tagGray}`}>● Tutup</span>
                    )}
                  </td>
                  <td data-label="Aksi" className="text-end">
                    <div className={`d-flex justify-content-end ${ui.rowActions}`}>
                      <button type="button" className={`d-inline-flex align-items-center justify-content-center ${ui.iconBtn}`} title="Edit" aria-label={`Edit ${warung.name}`} onClick={() => startEdit(warung)}>
                        <i className="fa-solid fa-pen"></i>
                      </button>
                      <button type="button" className={`d-inline-flex align-items-center justify-content-center ${ui.iconBtn} ${ui.iconBtnDanger}`} title="Hapus" aria-label={`Hapus ${warung.name}`} onClick={() => deleteWarung(warung.id)}>
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
        <Form onSubmit={saveWarung}>
          <Modal.Header closeButton>
            <Modal.Title>{form.id ? "Edit Warung" : "Tambah Warung"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group className={ui.field}>
              <Form.Label>Nama warung</Form.Label>
              <Form.Control required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
            </Form.Group>
            <Form.Group className={ui.field}>
              <Form.Label>Alamat</Form.Label>
              <Form.Control required value={form.address} onChange={(event) => setForm({ ...form, address: event.target.value })} />
            </Form.Group>
            <Form.Group className={ui.field}>
              <Form.Label>Hari buka</Form.Label>
                <Form.Control required value={form.openDays} onChange={(event) => setForm({ ...form, openDays: event.target.value })} />
            </Form.Group>
            <div className="d-flex gap-3">
              <Form.Group className={`${ui.field} flex-fill`}>
                <Form.Label>Jam buka</Form.Label>
                <Form.Control required type="time" value={form.openTime} onChange={(event) => setForm({ ...form, openTime: event.target.value })} />
              </Form.Group>
              <Form.Group className={`${ui.field} flex-fill`}>
                <Form.Label>Jam tutup</Form.Label>
                <Form.Control required type="time" value={form.closeTime} onChange={(event) => setForm({ ...form, closeTime: event.target.value })} />
              </Form.Group>
            </div>
            <Form.Group className={ui.field}>
              <Form.Label>Deskripsi</Form.Label>
              <Form.Control as="textarea" rows={2} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} />
            </Form.Group>
            <Form.Group className={ui.field}>
              <Form.Label>Alamat gambar</Form.Label>
              <Form.Control value={form.image} onChange={(event) => setForm({ ...form, image: event.target.value })} />
            </Form.Group>
            <Form.Group className={ui.field}>
              <Form.Label>Link Google Maps</Form.Label>
              <Form.Control value={form.mapsUrl} onChange={(event) => setForm({ ...form, mapsUrl: event.target.value })} />
            </Form.Group>
            <Form.Group className={ui.field}>
              <Form.Label>Makanan</Form.Label>
              {foodOptions.map((food) => (
                <Form.Check key={food.id} type="checkbox" label={food.name} checked={form.foodIds.includes(food.id)} onChange={(event) => updateList("foodIds", food.id, event.target.checked)} />
              ))}
            </Form.Group>
            <Form.Group className={ui.field}>
              <Form.Label>Menu lain (pisahkan dengan koma)</Form.Label>
              <Form.Control value={form.otherMenu.join(", ")} onChange={(event) => setForm({ ...form, otherMenu: event.target.value.split(",").map((item) => item.trim()).filter(Boolean) })} />
            </Form.Group>
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
