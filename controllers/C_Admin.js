import Admin from "../models/M_Admin.js";

export const getAdmin = async (req, res) => {
    try {
      console.log("Starting to fetch admin data");
      const adminData = await Admin.findAll(); 
      console.log("Fetched admin data:", adminData);
      res.status(200).json(adminData);
    } catch (error) {
      console.error("Error fetching admin data:", error.message);
      res.status(500).json({ msg: "Server Error" });
    }
  };

// Login
export const adminLogin = async (req, res) => {
    try {
      const admin = await Admin.findOne({
        where: {
          username: req.body.username,
        },
      });
  
      if (!admin) {
        return res.status(404).json({ msg: "Username tidak ada!" });
      }
  
      if (req.body.password !== admin.password) {
        return res.status(400).json({ msg: "Wrong Password" });
      }

      res.status(200).json({ msg: "Login successful", admin: { id: admin.id, name: admin.name } });
  
    } catch (error) {
      console.error("Error during admin login:", error.message);
      res.status(500).json({ msg: "Server Error" });
    }
  };


