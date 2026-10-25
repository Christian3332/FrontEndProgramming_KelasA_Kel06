      <section aria-labelledby="favorit-title">
        <div className="text-center mb-4">
          <div className="fs-1 text-danger" aria-hidden="true">
            ♥
          </div>
          <h2 id="favorit-title">Favorit Saya</h2>
          <p className="text-secondary" aria-live="polite">
            {list.length > 0
              ? `Kamu menyimpan ${list.length} kuliner favorit. Klik ikon hati lagi untuk menghapusnya dari daftar.`
              : "Simpan kuliner yang ingin kamu coba agar mudah ditemukan kembali."}
          </p>
          {list.length > 0 && (
            <button
              type="button"
              className="btn btn-link text-danger"
              onClick={() => setConfirmOpen(true)}
            >
              Hapus semua favorit
            </button>
          )}
        </div>

        {list.length === 0 ? (
          <div className="mx-auto text-center border border-2 rounded-4 p-5" style={{ maxWidth: 520 }}>
            <div className="fs-1" aria-hidden="true">
              ♡
            </div>
            <h3>Belum ada makanan favorit.</h3>
            <p>Klik ikon hati pada makanan yang ingin kamu simpan.</p>
            <Link href="/katalog" className="btn btn-primary rounded-pill">
              Jelajahi Katalog
            </Link>
          </div>
        ) : (
          <div className="row g-4">
            {list.map((food) => (
              <div className="col-12 col-sm-6 col-lg-4" key={food.id}>
                <FoodCard food={food} onOpen={setSelected} />
              </div>
            ))}
          </div>
        )}
      </section>