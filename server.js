const { createClient } = require("@supabase/supabase-js");
const config = require("./config/supabaseCreds");

let express = require("express");
let app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

app.get("/comments/:id", async (req, res) => {
  try {
    const postid = req.params["id"]
    console.log("postid: ", postid);
    const supabase = createClient(config.PROJECT_URL, config.API_KEY);
    const { data, error } = await supabase
      .from("comments")
      .select()
      .eq("postid",postid)
      .order("date", {ascending:false});
    if (error) {
      throw new Error(error.message);
    }
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    console.error(error.message);
  }
});

app.post("/newpost", async (req, res) => {
  const body = req.body;
  try {
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
    console.log(req.body);
    console.log(data);
  } catch (error) {
    console.error(error.message);
  }
});

app.post("/newcomment", async (req, res) => {
  const body = req.body;
  console.log(body);
  try {
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
    console.log(req.body);
    console.log(data);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/", async (req, res) => {
  console.log(config.PROJECT_URL);
  try {
    const supabase = createClient(config.PROJECT_URL, config.API_KEY);
    const { data, error } = await supabase.from("entries").select().order("date", {ascending:false});
    if (error) {
      throw new Error(error.message);
    }
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    console.error(error.message);
  }
});
app.listen(process.env.PORT);
