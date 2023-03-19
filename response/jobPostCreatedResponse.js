class JobPostCreatedResponse {
    constructor(jobPost) {
        this.jobPost = jobPost;
    
        this.message = "Job post created successfully"
    }
}
module.exports = JobPostCreatedResponse;