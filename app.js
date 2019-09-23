const targetUrl = 'https://tts-dashboard.herokuapp.com';
// const targetUrl = 'http://localhost:8080';

const myQueue = document.getElementById("queueContent");
myQueue.innerHTML = `<div><button class="btn btn-success" onclick="viewProduct({}, myQueue)">Add New Product</button></div>`;
myQueue.innerHTML += `<div class="row" style=";color:black;width:94vw;margin:0.8rem;font-size:1.5rem;font-weight:600;">`
  + `<div class="col-md-1">ID</div>`
  + `<div class="col-md-2">Name</div>`
  + `<div class="col-md-1">Full Price</div>`
  + `<div class="col-md-1">Sale Price</div>`
  + `<div class="col-md-1">Avail</div>`
  + `<div class="col-md-2">Category</div>`
  + `<div class="col-md-2">Supplier</div>`
  + `</div>`;


const populateLine = (product) => {
  const lineID = `product${product.id}`;

  const div = document.createElement('div');
  div.className = "row";
  div.id = lineID;
  div.style = "width:94vw;margin:0.8rem;background-color:#eee;font-size:1.4rem;";

  myQueue.appendChild(div);
  const myDiv = document.getElementById(lineID);
  myDiv.innerHTML = `<div class="col-md-1">${product.id}</div>`
    + `<div class="col-md-2">${product.productName}</div>`
    + `<div class="col-md-1">\$${numberWithCommas(product.fullPrice.toFixed(2))}</div>`
    + `<div class="col-md-1">\$${numberWithCommas(product.salePrice.toFixed(2))}</div>`
    + `<div class="col-md-1">${product.availability == 1 ? "Yes" : product.availability == 0 ? "No" : product.availability}</div>`
    + `<div class="col-md-2">${product.category}</div>`
    + `<div class="col-md-3">${product.supplier}</div>`;

  const mouseOver = () => { myDiv.style.opacity = 0.5; }
  myDiv.addEventListener('mouseover', mouseOver);
  const mouseOut = () => { myDiv.style.opacity = 1; myDiv.style }
  myDiv.addEventListener('mouseout', mouseOut);
  const myFunction = () => { viewProduct(product, myQueue) }
  myDiv.addEventListener('click', myFunction);

}

(async () => {
  const productJSON = await fetch(`${targetUrl}/products?size=10&page=0`);
  const productData = await productJSON.json();
  const productArray = await productData._embedded.products;
  for (let product in productArray) {
    const categoryJSON = await fetch(productArray[product]._links.category.href);
    const categoryData = await categoryJSON.json();
    const supplierJSON = await fetch(productArray[product]._links.supplier.href);
    const supplierData = await supplierJSON.json();
    const productObject = {
      id: +productArray[product]._links.self.href.split('/')[4],
      productName: productArray[product].productName,
      fullPrice: productArray[product].fullPrice,
      salePrice: productArray[product].salePrice,
      availability: productArray[product].availability,
      category: categoryData.categoryName,
      categoryLink: categoryData._links.self.href,
      supplier: supplierData.supplierName,
      supplierLink: supplierData._links.self.href
    }
    populateLine(productObject);
  }
})();

const viewProduct = async (product, target) => {
product.availability = (product.availability) ? product.availability : false;
product.category = (product.category) ? product.category : null;
product.categoryLink = (product.categoryLink) ? product.categoryLink : null;
product.fullPrice = (product.fullPrice) ? product.fullPrice : 0;
product.id = (product.id) ? product.id : null;
product.productName = (product.productName) ? product.productName : 'Product Name';
product.salePrice = (product.salePrice) ? product.salePrice : 0;
product.supplier = (product.supplier) ? product.supplier : null;
product.supplierLink = (product.supplierLink) ? product.supplierLink : null;

  const categoriesJSON = await fetch(`${targetUrl}/categories?size=100`);
  const categoriesData = await categoriesJSON.json();
  const categories = await categoriesData._embedded.categories.map(category => {
    const link = category._links.self.href;
    return `<option value="${link}" ${link == product.categoryLink ? "selected" : ""}>${category.categoryName}</option>`
  });
  const suppliersJSON = await fetch(`${targetUrl}/suppliers?size=200`);
  const suppliersData = await suppliersJSON.json();
  const suppliers = await suppliersData._embedded.suppliers.map(supplier => {
    const link = supplier._links.self.href;
    return `<option value="${link}" ${link == product.supplierLink ? "selected" : ""}>${supplier.supplierName}</option>`
  });
  document.getElementById("screenName").innerHTML = ` &nbsp; ${product.id === null ? "Add" : "Update / Remove"} Product`;
  target.innerHTML = "";
  target.innerHTML += `<div class="row" style="width:94vw;margin:0.8rem;font-size:1.3rem;">`
    + `<div class="col-md-12">`
    + `<div class="card bg-light">`
    + `<div class="card-header"> ${product.productName}</div>`
    + `<div class="card-body">`
    + `<form id="updateForm">`
    + `<div class="row">`
    + `<div class="col-md-12">`
    + `<div class="card text-white bg-secondary">`
    + `<div class="card-header">Product ID# ${!product.id ? "" : product.id}</div>`
    + `<div class="card-body">`
    + `<div>Product Name: <input type="text" name="productName" value="${product.productName}"></div>`
    + `<div>Full Price: \$<input type="text" name="fullPrice" value="${numberWithCommas(product.fullPrice.toFixed(2))}"></div>`
    + `<div>Sale Price: \$<input type="text" name="salePrice" value="${numberWithCommas(product.salePrice.toFixed(2))}"></div>`
    + `<div>Availability: `
    + ` &nbsp; Yes <input type="radio" id="avail-yes" name="availability" value="true" ${product.availability == true ? "checked" : ""}>`
    + ` &nbsp; No <input type="radio" id="avail-no" name="availability" value="false" ${product.availability == false ? "checked" : ""}>`
    + `</div>`
    + `<div><label for="category-select">Category:&nbsp;</label>`
    + `<select id="category-select" name="category">`
    + categories.join("\n")
    + `</select>`
    + `</div>`
    + `<div><label for="supplier-select">Supplier:&nbsp;</label>`
    + `<select id="supplier-select" name="supplier">`
    + suppliers.join("\n")
    + `</select>`
    + `</div>`
    + `</div>`
    + `</div>`
    + `<div class="row" style="margin-top:0.8rem">`
    + `<div class="col-sm-4 col-md-3 col-lg-2"><button id="updateButton" type="submit" class="btn btn-secondary">${product.id === null ? "Add" : "Update"}&nbsp;Product</button></div>`
    + `<div class="col-sm-4 col-md-6 col-lg-7"><button class="btn btn-outline-secondary" onclick="location.reload">Cancel</button></div>`
    + `<div class="col-sm-4 col-md-3 col-lg-2">${product.id === null ? '' : '<button id="confirmButton" type="button" class="btn btn-danger">Remove&nbsp;Product</button>'}</div>`
    + `</div>`
    + `</div>`
    + `</form>`
    + `</div>`
    + `</div>`
    + `</div>`
    + `</div>`;

  $(document).ready(function () {
    $('#updateForm').submit(function (e) {

      e.preventDefault();

      const restUrl = product.id === null ? `${targetUrl}/products` : `${targetUrl}/products/${product.id}`;

      const data = $(this).serialize().split("%20").join(" ").split("&");
      const obj = {};
      for (var key in data) {
        obj[data[key].split("=")[0]] = data[key].split("=")[1];
      }

      $.ajax({
        type: product.id === null ? 'POST' : 'PATCH',
        url: restUrl,
        data: JSON.stringify(obj),
        processData: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json"
      });
    location.reload();
    });
  });

  const deleteAlert = () => {
    let answer = confirm(`Are you sure you want to remove product #${product.id}?`);
    if (answer) {
      fetch(`${targetUrl}/products/${product.id}`, { method: 'DELETE' });
      location.reload();
    }
    else {
      alert(`Product #${product.id} was not removed.`);
      location.reload();
    }
  }
  if (document.getElementById("confirmButton"))
  document.getElementById("confirmButton").addEventListener('click', deleteAlert);
}


const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
