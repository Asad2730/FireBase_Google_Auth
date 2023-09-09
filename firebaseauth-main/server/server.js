const express = require("express");
const cors = require("cors");
const User = require("./config");
const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  console.log("get data");
  const snap = await User.get();
  const list = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  res.send(list);
});
var corsOptions = {
  origin: "http://localhost:5173",
};

app.use(cors(corsOptions));
app.use(
  cors({
    cors: "*",
  })
);

app.post("/api/addUser", async (req, res) => {
  console.log("user data addition");
  try {
    const userData = req.body;

    await User.add(userData);

    return res.status(201).json({ message: "User data added to Firestore" });
  } catch (error) {
    console.error("Error adding user data to Firestore:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
app.post("/update", async (req, res) => {
  const id = req.params.id;
  delete req.body.id;
  const data = req.data;
  await User.doc(id).update(data);
  res.send({ msg: "User updated successfully" });
});

app.delete("/delete", async (req, res) => {
  const id = req.params.id;
  await User.doc(id).delete();
  res.send({ msg: "User deleted successfully" });
});

const PORT = process.env.PORT || 8090;
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}.`);
});
