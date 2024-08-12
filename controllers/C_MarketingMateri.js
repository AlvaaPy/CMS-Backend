import MarketingMateri from "../models/M_MarketingMateri.js";
import TopikMarketing from "../models/M_TopikMarketing.js";
import upload from "../config/Multer.js";



// Create
export const createMarketingMateri = async (req, res) => {
    upload.single('materi_media')(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ msg: err.message });
        }

        const { id_topik_marketing } = req.body;
        const materi_media = req.file ? req.file.filename : req.body.materi_media; 

        try {
            const topikMarketing = await TopikMarketing.findByPk(id_topik_marketing);
            if (!topikMarketing) {
                return res.status(404).json({ msg: "Materi Marketing tidak ditemukan" });
            }

            const newMarketingMateri = await MarketingMateri.create({
                materi_media,
                id_topik_marketing
            });

            res.status(201).json(newMarketingMateri);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ msg: "Terjadi kesalahan pada server" });
        }
    });
};