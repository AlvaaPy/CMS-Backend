import express from "express"
import getAdmin from "../controllers/C_Admin"

const routeradmin = express.Router();

router.get('/admin', getAdmin);
router.post('/users', Register);
router.post('/login', Login);

export default routeradmin;