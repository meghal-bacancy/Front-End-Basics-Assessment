usersData = [
    {
        id: 1,
        username: "John Doe",
        email: "john.doe@bacancy.com",
        password: "John@123"
    }
]

const blogsData = [
    {
        id: 1,
        title: "Getting Started with HTML",
        image: "html.jpg",
        content: "HTML is the foundation of web development. Learn how to structure content using semantic tags.",
        comments: [
            {
                username: "Alice",
                content: "This was super helpful, thanks!",
            },
            {
                username: "Bob",
                content: "Loved the explanation of semantic elements!",
            }
        ]
    },
    {
        id: 2,
        title: "CSS Tips for Clean Design",
        image: "css.png",
        content: "Mastering layout, spacing, and responsiveness can take your design from average to amazing.",
        comments: [
            {
                username: "Charlie",
                content: "Grid vs Flexbox guide was 🔥",
            }
        ]
    },
    {
        id: 3,
        title: "JavaScript Made Simple",
        image: "js.png",
        content: "Learn how JavaScript brings interactivity to your websites with real-world examples.",
        comments: [
            {
                username: "Dana",
                content: "Clear and concise – great post!",
            }
        ]
    }
];


if (!localStorage.getItem("userData")) {
    localStorage.setItem("userData", JSON.stringify(usersData));
}

if (!localStorage.getItem("blogsData")) {
    localStorage.setItem("blogsData", JSON.stringify(blogsData));
}
