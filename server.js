const { createClient } = require("@supabase/supabase-js");
const config = require("./config/supabaseCreds");

let express = require("express");
let app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

app.get("/comments/:id", async (req, res) => {
  try {
    const postid = req.params["id"];
    const supabase = createClient(config.PROJECT_URL, config.API_KEY);
    const { data, error } = await supabase
      .from("comments")
      .select()
      .eq("postid", postid)
      .order("date", { ascending: false });
    if (error) {
      throw new Error(error.message);
    }
    res.status(200).json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json(error.message);
  }
});

app.post("/newpost", async (req, res) => {
  try {
    const body = req.body;
    const supabase = createClient(config.PROJECT_URL, config.API_KEY);
    const { data, error } = await supabase
      .from("entries")
      .insert([
        {
          postid: body.postid,
          nickname: body.nickname,
          header: body.header,
          content: body.content,
          category: body.category,
          date: new Date().toISOString(),
        },
      ])
      .select();
    if (error) {
      throw new Error(error.message);
    }
    res.status(200).json("Success");
  } catch (error) {
    console.error(error.message);
    res.status(500).json(error.message);
  }
});

app.post("/newcomment", async (req, res) => {
  try {
    const body = req.body;
    const supabase = createClient(config.PROJECT_URL, config.API_KEY);
    const { data, error } = await supabase
      .from("comments")
      .insert([
        {
          commentid: body.commentid,
          postid: body.postid,
          comment: body.comment,
          nickname: body.nickname,
          date: new Date().toISOString(),
        },
      ])
      .select();
    if (error) {
      throw new Error(error.message);
    }
    res.status(200).json("Success");
  } catch (error) {
    console.error(error.message);
    res.status(500).json(error.message);
  }
});

app.get("/", async (req, res) => {
  try {
    const supabase = createClient(config.PROJECT_URL, config.API_KEY);
    const { data, error } = await supabase
      .from("entries")
      .select()
      .order("date", { ascending: false });
    if (error) {
      throw new Error(error.message);
    }
    res.status(200).json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json(error.message);
  }
});

app.listen(process.env.PORT || 4000);
