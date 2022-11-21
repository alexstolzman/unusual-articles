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
    async getArticle(){

    }

    //Get all articles
    async getArticles(){
        //Fetch all table contents
        const response=await fetch("https://www.wikitable2json.com/api/Wikipedia%3AUnusual_articles?lang=en&cleanRef=false");
        const json=await response.json();
        this.setState({title: json[0][0][0]});
        console.log(json[0][0][0]);
        //set state
    }

    handleClick=()=>{
        //api call
        this.getArticles();
        //get random article

    }


    render(){
        return(
            <div>
                <h1>{this.state.title}</h1>
                <img src={this.imgUrl} alt="Article image" />
                <p>{this.state.summary}</p>
                <button onClick={this.handleClick}>Random Article</button>
            </div>
        )
    }
}

export default Article;