import React from 'react'

class Article extends React.Component{
    constructor(props){
        super(props);
        this.state={
            title: "Title",
            imgUrl: "",
            summary: "summary"
        };
       
    }

    //Get specific article
    async getArticle(article){
        //Replace spaces with underscores
        const formatted = article.replaceAll(' ', '_');
        const formatted2=formatted.replaceAll("'","%27")
        console.log(formatted2);
        const response=await fetch("https://en.wikipedia.org/api/rest_v1/page/summary/"+formatted2);
        const json=await response.json();
        //Set summary and image url for page
        this.setState({summary: json.extract, imgUrl: json.originalimage.source, title: article})

        
    }

    //Get all articles
    async getArticles(){
        //Fetch all table contents for the Unusual Articles page
        const response=await fetch("https://www.wikitable2json.com/api/Wikipedia%3AUnusual_articles?lang=en&cleanRef=false");
        const json=await response.json();

        //Generate random numbers for category and articles in category
        const category=Math.floor(Math.random()*json.length)
        const article=Math.floor(Math.random()*json[category].length)

        //this.setState({title: json[0][0][0]});
        //console.log(json[0][0][0]);
        this.getArticle(json[category][article][0]);
        //set state
    }

    handleClick=()=>{
        this.getArticles();
    }


    render(){
        return(
            <div className='relative inset-y-5 px-4 py-4'>
                <h1>{this.state.title}</h1>
                <img src={this.state.imgUrl} alt="Article image" style={{width:200, height:300}}/>
                <p>{this.state.summary}</p>
                <button onClick={this.handleClick}>Random Article</button>
            </div>
        )
    }
}

export default Article;