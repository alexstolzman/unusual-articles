import React from 'react'

class Article extends React.Component{
    constructor(props){
        super(props);
        this.state={
            title: "",
            imgUrl: "",
            summary: "",
            articles: []
        };
       
    }

    //Get all articles immediately on component mount
    componentDidMount(){
        this.getAllArticles();
    }

    //Get specific article
    async getArticle(){
        //Get random article from list of articles
        const num=Math.floor(Math.random()*this.state.articles.length)
        const article=this.state.articles[num].substring(18, this.state.articles[num].length-1)

        const response=await fetch("https://en.wikipedia.org/api/rest_v1/page/summary/"+article);
        const json=await response.json();

        //Set summary and image url for page
        this.setState({summary: json.extract, title: json.title})

        //Set image if it exists
        if(json.hasOwnProperty('originalimage')){
            this.setState({imgUrl: json.originalimage.source})
        }
        else{
            this.setState({imgUrl: "No Image"})
        }
    }

    //Get all articles on the Unusual Articles Wikipedia page
    async getAllArticles(){
        const response2=await fetch("https://en.wikipedia.org/w/api.php?action=parse&origin=*&page=Wikipedia:Unusual_articles&prop=text&format=json") //&prop=text
        const json2=await response2.json();
        
        //Get article names from the text response
        let regex = new RegExp("<b><a href=\\\"\/wiki\/(.*?)\"", "g");
        const str=json2.parse.text['*'];
        let strArr=str.match(regex)

        this.setState({articles: strArr})



    }

    handleClick=()=>{
        this.getArticle();
    }


    render(){
        return(
            <div className='relative inset-y-5 px-4 py-4 object-center space-y-5'>
                <a className="text-2xl font-bold text-stone-900" href={"https://en.wikipedia.org/wiki/"+this.state.title}>{this.state.title}</a>
                <img className="mx-auto" src={this.state.imgUrl} alt="Article image" />
                <p>{this.state.summary}</p>
                <button className='bg-indigo-500  text-white' onClick={this.handleClick}>Random Article</button>
            </div>
        )
    }
}

export default Article;