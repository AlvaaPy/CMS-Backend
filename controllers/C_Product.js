import TopikProduct from "../models/M_Product.js";
import Divisi from "../models/M_Divisi.js";
import upload from "../config/Multer.js";

// Create
export const createTopikProduct = async (req, res) => {
    upload.single("foto_topik")(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ msg: err.message });
      }
  
      const { id_Divisi, judul, deskripsi } = req.body;
      const foto_topik = req.file ? req.file.filename : null;
  
      try {
        const divisi = await Divisi.findByPk(id_Divisi);
        if (!divisi) {
          return res.status(404).json({ msg: "Divisi tidak ditemukan" });
        }
  
        const newtopikProduct = await TopikProduct.create({
          id_Divisi,
          nama_divisi: divisi.nama_divisi, 
          judul,
          foto_topik,
          deskripsi,
        });
  
        res.status(201).json(newtopikProduct);
      } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan pada server" });
      }
    });
  };

// Read
export const getAllProduct = async (req, res) => {
    try {
      const topikProduct = await TopikProduct.findAll({
        include: [{ model: Divisi }], 
      });
      res.status(200).json(topikProduct);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
  };

// getById
export const getProductId = async (req, res) => {
    try {
      const topikProduct = await TopikProduct.findOne({
        where: { id: req.params.id },
        include: [
          { model: Divisi }, 
        ],
      });
  
      if (!topikProduct) {
        return res.status(404).json({ msg: "Topik Product tidak ditemukan" });
      }
  
      res.status(200).json(topikProduct);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
  };

// Update
export const updateTopikProduct = async (req, res) => {
    upload.single("foto_topik")(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ msg: err.message });
      }
  
      const { id_Divisi, judul, deskripsi } = req.body;
      const foto_topik = req.file ? req.file.filename : null;
  
      try {
        const topikProduct = await TopikProduct.findByPk(req.params.id);
  
        if (!topikProduct) {
          return res.status(404).json({ msg: "Topik Product tidak ditemukan" });
        }
  
        if (id_Divisi) {
          const divisi = await Divisi.findByPk(id_Divisi);
          if (!divisi) {
            return res.status(404).json({ msg: "Divisi tidak ditemukan" });
          }
        }
  
        await TopikProduct.update(
          {
            id_Divisi: id_Divisi || topikProduct.id_Divisi,
            nama_divisi: id_Divisi
              ? Divisi.nama_divisi
              : topikProduct.nama_divisi,
            judul: judul || topikProduct.judul,
            deskripsi: deskripsi || topikProduct.deskripsi,
            foto_topik: foto_topik || topikProduct.foto_topik,
          },
          {
            where: { id: req.params.id },
          }
        );
  
        res.status(200).json({ msg: "Topik Product berhasil diperbarui" });
      } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan pada server" });
      }
    });
  };

// Delete
export const deleteTopikProduct = async (req, res) => {
    try {
      const topikProduct = await TopikProduct.findByPk(req.params.id);
  
      if (!topikProduct) {
        return res.status(404).json({ msg: "Topik Product tidak ditemukan" });
      }
  
      await TopikProduct.destroy({
        where: { id: req.params.id },
      });
  
      res.status(200).json({ msg: "Topik Product berhasil dihapus" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
  };