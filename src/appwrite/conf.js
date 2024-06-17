import config from "../conf/config";
import{Client,ID,Databases,Storage,Query} from "appwrite"

export class Service{
    client=new Client()
    databases
    bucket
    constructor(){
        this.client.setEndpoint(config.appwriteurl)
        .setProject(config.appwriteprojectid)
        this.databases=new Databases(this.client)
        this.bucket=new Storage(this.client)
    }
    async createPost({title,slug,content,featureimage,status,userid}){
        try {
            return await this.databases.createDocument(
                config.appwritedatabaseid,
                config.appwritecollectionid,
                slug,
                {title,content,featureimage,status,userid})
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }
    async updatePost(slug,{title,content,featureimage,status}){
                try {
                    return await this.databases.updateDocument(
                        config.appwritedatabaseid,
                        config.appwritecollectionid,
                        slug,
                        {title,content,featureimage,status}
                    )
                } catch (error) {
                    throw error
                }
    }
    async deletePost(slug){
            try {
               await this.databases.deleteDocument(
                    config.appwritedatabaseid,
                            config.appwritecollectionid,
                            slug,
                            
                )
                return true
            } catch (error) {
             throw error  
             return false 
            }
    }
    async getPost(slug){
            try {
                return await this.databases.getDocument(
                    config.appwritedatabaseid,
                    config.appwritecollectionid,
                    slug)
            } catch (error) {
                throw error
            }
    }

    async getPosts(queries=[Query.equal("status","active")]){
            try {
                return await this.databases.listDocuments(
                    config.appwritedatabaseid,
                    config.appwritecollectionid,
                    queries,
                    
                )
            } catch (error) {
                throw error
                return false
            }
    }
    //file
    async uploadFile(file){
            try {
                return await this.bucket.createFile(
                    config.appwritebucketid,
                    ID.unique(),
                    file
                )
            } catch (error) {
                console.log("Appwrite serive :: uploadFile :: error", error);
                return false
            }
    }
    async deleteFile(fileId){
            try {
                await this.bucket.deleteFile(config.appwritebucketid,
                    fileId
                    
                )
                return true
            } catch (error) {
                throw error
                return false
            }
    }
    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            config.appwritebucketid,
            fileId
        )
    }
}

const service=new Service()
export default service
