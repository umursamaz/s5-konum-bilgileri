// import axios from "axios";

// const { default: axios } = require("axios");
// const { createElement } = require("react");

// Aşağıdaki Fonksiyonu değiştirmeyin.
async function ipAdresimiAl() {
  return await axios({
    method: "get",
    url: "https://apis.ergineer.com/ipadresim",
  }).then(function (response) {
    return response.data;
  });
}

/*
  AMAÇ:
  - location_card.png dosyasındakine benzer dinamik bir card oluşturmak.
  - HTML ve CSS hazır, önce IP adresini, sonra bunu kullanarak diğer bilgileri alacağız.

	ADIM 1: IP kullanarak verileri almak
  getData fonskiyonunda axios kullanarak şu adrese GET sorgusu atacağız: https://apis.ergineer.com/ipgeoapi/{ipAdresiniz}

  Fonksiyon gelen datayı geri dönmeli.

  Not: Request sonucu gelen datayı browserda network tabından inceleyin.
  İpucu: Network tabıından inceleyemezseniz GET isteklerini gönderdiğiniz URL'i direkt browserda açabildiğinizi unutmayın. 😉

  Bu fonksiyonda return ettiğiniz veri, Adım 2'de oluşturacağınız component'de argüman olarak kullanılıyor. Bu yüzden, veride hangi key-value çiftleri olduğunu inceleyin.
*/

async function getData() {
  /* kodlar buraya */
  return (await axios.get(`https://apis.ergineer.com/ipgeoapi/${await ipAdresimiAl()}`)).data;
}

/*
	ADIM 2: Alınan veriyi sayfada gösterecek componentı oluşturmak
  getData ile aldığımız konum bazlı veriyi sayfada göstermek için cardOlustur fonskiyonu kullanılacak. DOM metodlarını ve özelliklerini kullanarak aşağıdaki yapıyı oluşturun ve dönün (return edin).

  Not: Ülke Bayrağını bu linkten alabilirsiniz:
  'https://flaglog.com/codes/standardized-rectangle-120px/{ülkeKodu}.png';

	<div class="card">
    <img src={ülke bayrağı url} />
    <div class="card-info">
      <h3 class="ip">{ip adresi}</h3>
      <p class="ulke">{ülke bilgisi (ülke kodu)}</p>
      <p>Enlem: {enlem} Boylam: {boylam}</p>
      <p>Şehir: {şehir}</p>
      <p>Saat dilimi: {saat dilimi}</p>
      <p>Para birimi: {para birimi}</p>
      <p>ISP: {isp}</p>
    </div>
  </div>
*/

function cardOlustur(data) {
  /* kodlar buraya */
  const card = document.createElement('div');
  card.classList.add('card');
  
  const img = document.createElement('img');
  img.src = `https://flaglog.com/codes/standardized-rectangle-120px/${data.ülkeKodu}.png`;

  const cardInfo = document.createElement('div');
  cardInfo.classList.add('card-info');
  
  const ip = document.createElement('h3');
  ip.classList.add('ip');
  ip.textContent = data["sorgu"];
  cardInfo.appendChild(ip);
  
  const ulke = document.createElement('p');
  ulke.classList.add('ulke');
  ulke.textContent = `${data.ülke} (${data.ülkeKodu})`;
  cardInfo.appendChild(ulke); 
  
  const enlemBoylam = document.createElement('p');
  enlemBoylam.textContent = `Enlem: ${data.enlem} - Boylam: ${data.boylam}`;
  cardInfo.appendChild(enlemBoylam); 
  
  const sehir = document.createElement('p');
  sehir.textContent = `Şehir: ${data.bölgeAdı}`;
  cardInfo.appendChild(sehir);

  const saatDilimi = document.createElement('p');
  saatDilimi.textContent = "Saat dilimi: " + data["saatdilimi"];
  cardInfo.appendChild(saatDilimi);

  const paraBirimi = document.createElement('p');
  paraBirimi.textContent = "Para birimi: " + data["parabirimi"];
  cardInfo.appendChild(paraBirimi);

  const isp = document.createElement('p');
  isp.textContent = "ISP: " + data["isp"];
  cardInfo.appendChild(isp);

  card.appendChild(img);
  card.appendChild(cardInfo);
  return card;
}

// Buradan sonrasını değiştirmeyin, burası yazdığınız kodu sayfaya uyguluyor.
getData().then((response) => {
  const cardContent = cardOlustur(response);
  const container = document.querySelector(".container");
  container.appendChild(cardContent);
});
