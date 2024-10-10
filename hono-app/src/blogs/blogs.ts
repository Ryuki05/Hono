import { Hono } from 'hono'
import { prettyJSON } from 'hono/pretty-json';

const app = new Hono();
let blogPosts = [
    {
      id:"1",
      title:"Blog1",
      content:"Blog1 Posts",
    },
    {
      id:"2",
      title:"Blog2",
      content:"Blog2 Posts",
    },
    {
      id:"2",
      title:"Blog2",
      content:"Blog2 Posts",
    },
  
];  

app.get("/",(c) => c.json({ posts: blogPosts }));

//特定のIDを取得
app.get("/:id", (c) => {
  const id = c.req.param("id");
  const post = blogPosts.find((p) => p.id ==  id);
  if (post){
    return c.json(post);
  } else {
    return c.json({message: "not found this page"},404);
  }
});

//postの作成
app.post("/", async (c) => {
  const {title, content} = await c.req.json<{
    title: string;
    content: string
  }>();
  const newPost = {
    id: String(blogPosts.length + 1),
    title,
    content
  };
  blogPosts = [...blogPosts,newPost];
  return c.json(newPost,201);
});

app.delete("/:id", async (c) => {
  const id = c.req.param("id");
  const index = blogPosts.findIndex((p) => p.id === id);

  if (index === -1){
    return c.json({message: "Post not found"}, 404);
  }

  blogPosts = blogPosts.filter((p) => p.id !== id);

  return c.json({message:"Blog post Deleted"});
});

export default app;

