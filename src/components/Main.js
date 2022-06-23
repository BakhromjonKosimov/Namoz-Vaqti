
import './Main.css'
import "aos/dist/aos.css";
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios'
import JSONDATA from './Regions.json'
function Main() {
    const [data] = useState(JSONDATA);
    const searchInpRef = useRef(null);
    const [time, setTime] = useState([]);
    const [visibleVariants, setVisibleVariants] = useState(true);
    const [remainTime, setRemainTime] = useState("");
    const [leftPrayers, setLeftPrayers] = useState("");
    const [selectedCity, setSelectedCity] = useState("Tashkent");
    const [cityJson, setCityJson] = useState(JSONDATA);

    useEffect(() => {
        axios.get(`https://ziyodullo.makkapoya.uz/API/Taqvim.php?city=${selectedCity}`)
            .then(res => {
                setTime(res.data)
            })
            .catch(err => {
                console.log("Error!");
            });

    }, []);
    const [searchTerm, setSearchTerm] = useState("");

    const selectVariant = (item) => {
        searchInpRef.current.value = item;
        setVisibleVariants(true);
    }

    const sumRemainTime = () => {
        const arr = [];
        const ret = {};
        const currentTime = new Date();
        const objectValues = Object.values(time).slice(0, Object.values(time).length - 2);
        let currentHour = 0;
        let currentMinut = 0;

        for (let x of objectValues) {
            if (Number(x.slice(0, 2)) > currentTime.getHours()) {
                arr.push(x);
            } else if (Number(x.slice(0, 2)) > currentTime.getHours()) {
                arr.push(x);
            }
        }
        const [selectedTime] = arr;

        for (var key in time) {
            ret[time[key]] = key;
        }

        const hour = selectedTime.slice(0, 2);
        const minut = selectedTime.toString().slice(3, 5);

        currentHour = hour - currentTime.getHours();
        currentMinut = minut - currentTime.getMinutes();
        if (currentMinut < 0) {
            currentHour = currentHour - 1;
            currentMinut = 60 + (currentMinut);
        }
        setRemainTime(`${currentHour.toString().length <= 1 ? `0${currentHour}` : currentHour}:${currentMinut}`);
        setLeftPrayers(ret[selectedTime]);
    }

    useEffect(() => {
        if (time.Peshin) {
            sumRemainTime();
        }
    }, [time]);

    useEffect(() => {
        axios.get(`https://ziyodullo.makkapoya.uz/API/Taqvim.php?city=${selectedCity}`)
            .then(res => {
                setTime(res.data)
            })
            .catch(err => {
                console.log("Error!");
            });
    }, [selectedCity]);

    const changeCity = () => {
        if (searchInpRef.current.value !== "") {
            setSelectedCity(searchInpRef.current.value);
            searchInpRef.current.value = "";
        }
    }

    const searchCity = () => {
        if (searchInpRef.current.value !== "") {
            setVisibleVariants(false);
        } else if (searchInpRef.current.value === "") {
            setVisibleVariants(true);
        }

        const cityArr = data.filter((item) => {
            return item.name.toLowerCase().match(new RegExp(searchInpRef.current.value.toLowerCase(), 'g'))
        })
        setCityJson(cityArr);
    }

    const entered = (e) => {
        if (e.code === "Enter") {
            changeCity();
            setVisibleVariants(true);
        }
    }
    return (
        <>
            <div className="body--section">


                <div className="nav--bar">
                    <div className="inner-nav container">
                        <i>
                            <img className='image-styled' data-aos="flip-left" alt=""
                                data-aos-easing="ease-out-cubic"
                                data-aos-duration="2000" src='https://png.monster/wp-content/uploads/2022/03/png.monster-934.png' />
                        </i>
                        <div className="search--button">
                            <div className="input-group flex-nowrap">

                                <input type="text" className="city--searching--input"
                                    placeholder={selectedCity}
                                    ref={searchInpRef}
                                    onKeyDown={entered}
                                    onBlur={() => setVisibleVariants(true)}
                                    onChange={searchCity} />

                                <ul className={visibleVariants ? "variant_list" : "variant_list active"}>
                                    {cityJson.map((value, key) => {
                                        return (
                                            <li onClick={() => selectVariant(value?.name)} className='user' key={key}>
                                                <p>{value.name}</p>
                                            </li>
                                        );
                                    })}
                                </ul>


                                <button type="button" onClick={changeCity} className="qidiruv">Qidirish</button>
                            </div>
                        </div>

                        <div className="changed--down">
                            <button type="button" className="btn  language-button" data-aos="flip-left"
                                data-aos-easing="ease-out-cubic"
                                data-aos-duration="2000">Uz</button>
                            <button type="button" className="btn  language-button" data-aos="flip-left"
                                data-aos-easing="ease-out-cubic"
                                data-aos-duration="2000">Ўз</button>
                        </div>

                    </div>

                </div>

                <div className="container">
                    <div className="time--section shadow-lg mb-2 bg-body rounded">
                        <p className="timing">{leftPrayers} namozgacha: {remainTime} minut vaqt qoldi!</p>
                    </div>
                    <div className="selecting--date">
                        <div className="today shadow-lg mb-3 bg-body rounded" data-aos="flip-left"
                            data-aos-easing="ease-out-cubic"
                            data-aos-duration="2000">
                            <p>BUGUN</p>
                        </div>
                        <div className="today shadow-lg mb-3 bg-body rounded" data-aos="flip-left"
                            data-aos-easing="ease-out-cubic"
                            data-aos-duration="2000">
                            <p>HAFTA</p>
                        </div>
                        <div className="today shadow-lg mb-3 bg-body rounded" data-aos="flip-left"
                            data-aos-easing="ease-out-cubic"
                            data-aos-duration="2000" >
                            <p>YIL</p>
                        </div>
                    </div>

                    <div className="main--cards">
                        <div data-aos="fade-up"
                            data-aos-duration="3000" className="card--time ">
                            <h2>{time.Tong}</h2>
                            <p>Bomdod</p>
                        </div>
                        <div data-aos="fade-up"
                            data-aos-duration="3000" className="sun-image">
                            <img src="https://www.pinclipart.com/picdir/big/581-5814307_sun-computer-file-sun-images-png-clipart.png" alt="" />
                            <p className='quyosh--letter'>{time.Quyosh}</p>
                        </div>
                        <div data-aos="fade-up"
                            data-aos-duration="3000" className="card--time">
                            <h2>{time.Peshin}</h2>
                            <p>Peshin</p>
                        </div>
                        <div data-aos="fade-up"
                            data-aos-duration="3000" className="card--time">
                            <h2>{time.Asr}</h2>
                            <p>Asr</p>
                        </div>
                        <div data-aos="fade-up"
                            data-aos-duration="3000" className="card--time">
                            <h2>{time.Shom}</h2>
                            <p>Shom</p>
                        </div>
                        <div data-aos="fade-up"
                            data-aos-duration="3000" className="card--time">
                            <h2>{time.Xufton}</h2>
                            <p>Hufton</p>
                        </div>
                    </div>

                    <div className="prayer--rule">
                        <a href="https://namoz.islom.uz/"  className="example--cards shadow-lg mb-3 bg-body rounded" data-aos="flip-left"
                            data-aos-easing="ease-out-cubic"
                            data-aos-duration="2000" >
                            <p>Tahorat</p>
                        </a>
                        <a href="https://islom.ziyouz.com/namoznoma/namoz-o-qish-tartibi" className="example--cards shadow-lg mb-3 bg-body rounded" data-aos="flip-left"
                            data-aos-easing="ease-out-cubic"
                            data-aos-duration="2000" >
                            <p>Namoz</p>
                        </a>
                        <a href="http://hidoyat.uz/wp-content/uploads/2019/07/har-kuni-oqiladigan-zikrlar-va-masur-duolar.pdf" className="example--cards shadow-lg mb-3 bg-body rounded" data-aos="flip-left"
                            data-aos-easing="ease-out-cubic"
                            data-aos-duration="2000" >
                            <p>Salovatlar</p>
                        </a>
                        <a href="https://n.ziyouz.com/books/islomiy/hadis/Imom%20al-Buxoriy.%20Al-Jome'%20as-sahih.%201-jild.pdf" className="example--cards shadow-lg mb-3 bg-body rounded" data-aos="flip-left"
                            data-aos-easing="ease-out-cubic"
                            data-aos-duration="2000" >
                            <p>Hadislar</p>
                        </a>
                        <a href="https://islom.uz/maqola/7995" className="example--cards shadow-lg mb-3 bg-body rounded" data-aos="flip-left"
                            data-aos-easing="ease-out-cubic"
                            data-aos-duration="2000" >
                            <p>6 Kalima</p>
                        </a>
                        <a href="https://forum.ziyouz.com/index.php?topic=2293.msg109926#msg109926" className="example--cards shadow-lg mb-3 bg-body rounded" data-aos="flip-left"
                            data-aos-easing="ease-out-cubic"
                            data-aos-duration="2000">
                            <p>Islom odobi</p>
                        </a>

                    </div>
                </div>
            </div>
            <div className="footer">
                <div className=" container footer--wrap">
                    <div className="footer--cards">
                        <h4>BIZ BILAN BOG'LANISH</h4>
                        <p>Telefon : +998907878899</p>
                        <p>Email : kosimovbakhromjon@gmail.com</p>
                        <p>Telegram : @Kosimov96</p>

                    </div>
                    <div className="footer--cards">
                        <h4>BIZ HAQIMIZDA</h4>
                        <p>Ushbu sayt siz musulmonlar uchun <br />
                            Allohga ibodatingizni o'z vaqtida <br />
                            bajarishga oz bo'lsada manfaat <br />
                            keltirishi uchun havaskor dasturchi tomonidan yasaldi</p>
                    </div>
                    <div className="footer--cards">
                        <h4>MANBA</h4>
                        <p>Sayt ma'lumotlarni Musulmonlar idorasi <br />
                            taqvimi asosida yuritiladi</p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Main;

