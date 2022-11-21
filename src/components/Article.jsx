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
        // const formatted = article.replaceAll(' ', '_');
        // const formatted2=formatted.replaceAll("'","%27")
        //console.log(formatted2);
        const response=await fetch("https://en.wikipedia.org/api/rest_v1/page/summary/"+article);
        const json=await response.json();
        //Set summary and image url for page
        this.setState({summary: json.extract, title: article})

        if(json.hasOwnProperty('originalimage')){
            this.setState({imgUrl: json.originalimage.source})
        }

        
    }

    //Get all articles
    async getArticles(){
        //Fetch all table contents for the Unusual Articles page
        //const response=await fetch("https://www.wikitable2json.com/api/Wikipedia%3AUnusual_articles?lang=en&cleanRef=false");
        //const json=await response.json();

        //Generate random numbers for category and articles in category
        //const category=Math.floor(Math.random()*json.length)
        //const article=Math.floor(Math.random()*json[category].length)

        //this.setState({title: json[0][0][0]});
        //console.log(json[0][0][0]);
        //this.getArticle(json[category][article][0]);
        //set state



        //Get section, then use to get response
        //https://en.wikipedia.org/w/api.php?action=parse&page=Wikipedia:Unusual_articles&prop=sections

        const response2=await fetch("https://en.wikipedia.org/w/api.php?action=parse&origin=*&page=Wikipedia:Unusual_articles&prop=text&format=json",{
            headers: {
                'Content-Type': 'text/html'
              }
        }) //&prop=text
        //<b><a href=\"/wiki/
        //<b><a href=\\\"\/wiki\/
        const json2=await response2.json();
        //json2.split("<a=href\"").pop.split("\"");

        let regex = new RegExp("<b><a href=\\\"\/wiki\/(.*?)\"", "g");

        const str=json2.parse.text['*'];
        let strArr=str.match(regex)
        const num=Math.floor(Math.random()*strArr.length)

        let title=strArr[num].substring(18, strArr[num].length-1)

        this.getArticle(title)
        console.log(title)
        //console.log(str.split("<b><a href=\\\"\/wiki\/")[0]);


    }

    handleClick=()=>{
        this.getArticles();
    }


    render(){

        //Add link to article
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