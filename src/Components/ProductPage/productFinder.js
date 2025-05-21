
function productFinder(data, gender, sale, id) {
    let s1, s2;
    if (gender === "Women") {
        s1 = data.lady
    } else {
        s1 = data.men
    }
    if (sale === 'true') {
        s2 = s1.sale
    } else {
        s2 = s1.normal
    }
    let found_product;
     s2.forEach(product => {

        if (product.id == Number(id)) {
            found_product = product;
        }
    });
    return found_product;
}

export default productFinder;