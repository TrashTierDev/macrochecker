function getFetch(){
let inputVal = document.getElementById("barcode").value

const url = `https://world.openfoodfacts.org/api/v0/product/${inputVal}.json`

if (inputVal.length !==12){
  alert('please try again')
  return;
}

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        if (data.status === 1){
          const item = new ProductInfo(data.product)
         item.showInfo()
        } else if(data.status === 0){
          alert(`Product ${inputVal} not found`)
        }
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

class ProductInfo{
  constructor(productData){//passing in data.product
  this.name = productData.product_name
  this.image = productData.image_url
  this.calories = productData.nutriments.energy_serving
  this.fat = productData.nutriments.fat_serving
  this.carb = productData.nutriments.carbohydrates_serving
  this.protein = productData.nutriments.proteins_serving

}
showInfo(){
  document.getElementById('product-img').src = this.image
  document.getElementById('product-name').innerText = this.name
  document.getElementById('product-energy').innerText = `Energy Per Serving  [${this.calories}]`
  document.getElementById('product-fat').innerText = `Fats Per Serving  [${this.fat}]`
  document.getElementById('product-carb').innerText = `Carbohydrates Per Serving  [${this.carb}]`
  document.getElementById('product-protein').innerText = `Proteins Per Serving  [${this.protein}]`
}
}
