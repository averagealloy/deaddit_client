 class Posts{
     constructor() {
         this.posts = []
         this.adapter = new PostsAdapter()
         this.initBindingsAndEventListeners()
         this.fetchAndLoadPosts()
     }
     initBindingsAndEventListeners() {
         this.postsContainer = document.getElementById('posts-container')
         this.postForm = document.getElementById('new-post')
         this.postTitle = document.getElementById('new-post-title')
         this.postContent = document.getElementById('new-post-content')
         this.postForm.addEventListener('submit', this.createPost.bind(this))
         this.postsContainer.addEventListener('dblclick', this.editPost.bind(this))
         this.postsContainer.addEventListener('blur', this.updatePost.bind(this), true)
     }

    // post begin 

     createPost(e) {
         e.preventDefault()
         const title = this.postTitle.value
         const content = this.postContent.value

         this.adapter.createPost(title, content).then( post =>{
             this.posts.push(new Post ( post ))
             this.postTitle.value = ''
             this.postContent.value = ''
             this.render()
         })
     }
     editPost(e){
         this.togglePost(e)
         
        }
        
        togglePost(e) {
            const li = e.target
            li.contentEditable = true
            li.focus()
            li.classList.add('editable')
        }

        updatePost(e) {
         const li = e.target
         li.contentEditable = false 
         li.classList.remove('editable')
         const value = li.innerHTML
         const id = li.dataset.id
         let [title, content] = value.split(':')
         this.adapter.updatePost(title, content, id)   
        }

     fetchAndLoadPosts(){
         this.adapter
         .getPosts()
         .then( posts => {
             posts.forEach( post => this.posts.push(new Post(post)))
         })
         .then( () => {
             this.render()
         })
     }

     render(){
         this.postsContainer.innerHTML = this.posts.map(post => post.renderPostList()).join('')
     }
    //  post end

    // comments begin 
 }