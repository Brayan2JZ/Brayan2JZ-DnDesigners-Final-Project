import React, { useState, useEffect, useContext } from "react";
import SignInBG from "../component/threeBG";
import '../../styles/home.css'
import tagImg from "../../img/tag_img.jpg";




export const Home = () => {
    const [cardList, setCardList] = useState([]);
    const [carouselCards, setCarouselCards] = useState([]);

    useEffect(() => {
        // Check if running in a Codespace
        if (window.location.hostname.endsWith('.github.dev')) {
            const codespaceName = window.location.hostname.split('.')[0].slice(0, -5);
            console.log(codespaceName);
            localStorage.setItem('backendUrl', `https://${codespaceName}-3001.app.github.dev/`);
        }
    }, []);
    useEffect(() => {
        async function getImageURLs() {
            fetch(localStorage.getItem('backendUrl') + 'api/cards', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
            }).then((response) => {
                return response.json();
            }).then((jsonRes) => {
                setCardList(jsonRes);
            });
        }
        const cardList = getImageURLs();
    }, []);

    useEffect(() => {
        let count = 0;
        var temp = [];
        if (cardList && cardList.length > 2) {
            while (count < 3) {
                let rand = Math.floor(Math.random() * cardList.length)
                if (temp.length == 0) {
                    temp = [...temp, rand];
                    count++;
                }
                let flag = true;
                for (let i of temp) {
                    if (i == rand) {
                        flag = false;
                        break;
                    }
                }
                if (flag) {
                    temp = [...temp, rand];
                    count++;
                }
            }
            setCarouselCards([cardList[temp[0]], cardList[temp[1]], cardList[temp[2]]])
        }
    }, [cardList])


    return (
        <div className="container mh-100">

            {/* <SignInBG /> */}
            <h1 className="text-center title">Featured</h1>
            <div id="carouselExampleIndicators" className="carousel slide">

                <div id="carouselCards" className="card-group card-group-scroll">
                    {carouselCards && carouselCards.map((cardObj) => (
                        <div className="col-4 m-0 p-1 " key={cardObj.id} onClick={() => handleImageClick(cardObj, true)}>
                            <img className="mw-100 top3" src={cardObj.url} alt={cardObj.filename} />
                        </div>
                    ))}

                </div>

            </div>
            <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
                <div className="col-10 col-sm-8 col-lg-6">
                    <img src={tagImg} alt="Bootstrap Themes" width="700" height="700" loading="lazy" />
                </div>

                <div className="col-lg-6">
                    <h1 className="display-5 fw-bold lh-1 mb-3 title">Tags</h1>
                    <p className="lead">
                        You can search and sort through the site using <em>Tags</em> to narrow down your search as well as help others find your contribition all the easier!
                        Whether you want to see game cards, artwork, or 3D models you can easily find them for the exact class, alignment, or rarity you are looking for through their <em>Tags</em>.
                    </p>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                        <a className="nav-link" href="/tags">
                            <button type="button" className="btn btn-secondary btn-lg px-4 me-md-2 title">Search Tags</button>
                        </a>
                        {/* Restored Create Button */}
                        <button type="button" className="btn btn-outline-warning btn-lg px-4 title">Create</button>
                    </div>
                </div>
            </div>

            {/* 3D Models Section */}
            <div className="row flex-lg-row align-items-center g-5 py-5">
                <div className="col-lg-6">
                    <h1 className="display-5 fw-bold lh-1 mb-3 title">3D Models</h1>
                    <p className="lead">Discover a variety of meticulously crafted 3D models designed for tabletop RPG games. These models include pawns, characters, and more, perfect for enhancing your gaming adventures.</p>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                        <a className="nav-link" href="/models">
                            <button type="button" className="btn btn-secondary btn-lg px-4 title">See Models</button>
                        </a>
                    </div>
                </div>
                <div className="col-10 col-sm-8 col-lg-6">
                    <img src="https://d2t1xqejof9utc.cloudfront.net/screenshots/pics/4035acb1bdb97ed80fb271cf869b63cc/large.png" className="d-block mx-lg-auto img-fluid" alt="3D Models Preview" width="700" height="500" loading="lazy" />
                </div>
            </div>
        </div>
    );
};
