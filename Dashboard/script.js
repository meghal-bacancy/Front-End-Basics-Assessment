if (localStorage.getItem('isLoggedIn') !== 'true') {
    window.location.href = '..\\login\\login.html';
}

const userEmail = document.getElementById('userEmail');
const blogContainer = document.getElementById('blogContainer');

const user = JSON.parse(localStorage.getItem("user"))
userEmail.innerHTML = `Hi, ${user.username}`;

const blogsData = JSON.parse(localStorage.getItem('blogsData')) || [];
displayBlog();

function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    window.location.href = '..\\index.html';
}

function getFirst30(str) {
    return str.length < 30 ? str : str.slice(0, 27) + '...';
}

function handleCommentPost(event) {
    event.preventDefault();
    
    const blogId = parseInt(event.target.getAttribute('data-id'));
    const input = event.target.querySelector('.comment-box');
    const commentContent = input.value.trim();
    
    if (commentContent === "") return;

    const blogIndex = blogsData.findIndex(b => b.id === blogId);
    if (blogIndex !== -1) {
        blogsData[blogIndex].comments.push({
            username: user.username,
            content: commentContent
        });

        localStorage.setItem("blogsData", JSON.stringify(blogsData));

        input.value = "";
        displayBlog();
    }
}

function displayBlog() {
    let blogs = "";
    for (const blog of blogsData) {
        blogs += `<div class="card" data-id="${blog.id}">
                    <h3 class="blog-heading">${blog.title} 
                        <span class="badge">
                            <i class="fa-solid fa-comments"></i> ${blog.comments.length}
                        </span>
                    </h3>
                    <img class="img" src="../Assets/dashboard/img/${blog.image}" alt="${blog.image}">
                    <p class="content">${getFirst30(blog.content)}</p>
                    <form class="comment-form" data-id="${blog.id}">
                        <input class="comment-box" type="text" placeholder="Add a comment..." required>
                        <button class="comment-btn" type="submit">Post</button>
                    </form>
                  </div>`;
    }
    blogContainer.innerHTML = blogs;

    document.querySelectorAll('.comment-form').forEach(form => {
        form.addEventListener('submit', handleCommentPost);
    });

    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', function (e) {
            if (e.target.closest('form')) return;

            const blogId = parseInt(card.getAttribute('data-id'));
            const blog = blogsData.find(b => b.id === blogId);
            if (blog) openModal(blog);
        });
    });
}

let currentBlogIndex = -1;

function openModal(blog) {
    const modal = document.getElementById('blogModal');
    const commentsList = document.getElementById('commentsList');
    currentBlogIndex = blogsData.findIndex(b => b.id === blog.id);

    document.getElementById('modalTitle').innerText = blog.title;
    document.getElementById('modalImage').src = `../Assets/dashboard/img/${blog.image}`;
    document.getElementById('modalImage').alt = blog.image;
    document.getElementById('modalContent').innerText = blog.content;

    commentsList.innerHTML = "";
    if (blog.comments.length === 0) {
        commentsList.innerHTML = "<li>No comments yet.</li>";
    } else {
        blog.comments.forEach((comment, index) => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${comment.username}</strong>: <span class="comment-text" data-index="${index}">${comment.content}</span>`;
            commentsList.appendChild(li);
        });
    }

    modal.classList.remove('hidden');
}

document.querySelector('.close-btn').addEventListener('click', () => {
    document.getElementById('blogModal').classList.add('hidden');
    displayBlog()
});

document.getElementById('blogModal').addEventListener('click', (e) => {
    if (e.target.id === 'blogModal') {
        e.currentTarget.classList.add('hidden');
    }
    displayBlog()
});

document.getElementById('commentsList').addEventListener('dblclick', (e) => {
    if (e.target.classList.contains('comment-text')) {
        const span = e.target;
        const index = span.dataset.index;
        const originalText = span.innerText;

        const input = document.createElement('input');
        input.type = 'text';
        input.value = originalText;
        input.className = 'edit-comment-input';
        input.setAttribute('data-index', index);

        span.replaceWith(input);
        input.focus();

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const newText = input.value.trim();
                if (newText !== "") {
                    blogsData[currentBlogIndex].comments[index].content = newText;
                    localStorage.setItem("blogsData", JSON.stringify(blogsData));
                    displayBlog();
                    openModal(blogsData[currentBlogIndex]);
                }
            } else if (e.key === 'Escape') {
                input.replaceWith(span);
            }
        });
    }
});

document.getElementById('modalCommentForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const commentContent = document.getElementById('modalCommentInput').value.trim();

    if (commentContent !== "") {
        blogsData[currentBlogIndex].comments.push({
            username: user.username,
            content: commentContent
        });

        localStorage.setItem("blogsData", JSON.stringify(blogsData));

        document.getElementById('modalCommentInput').value = "";
        openModal(blogsData[currentBlogIndex]);
    }
});
