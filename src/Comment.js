// custom class

class Comment {
    constructor(commentJSON){
        this.id = commentJSON.id
        this.content = commentJSON.the_comment
        this.postId = commentJSON.post_id
    }

    // renderComments(){


    //     return `
    //         <div class="text-center">
    //             <div class='content>

    //             </div>
    //         </div>
    //     `
        
    // }

}