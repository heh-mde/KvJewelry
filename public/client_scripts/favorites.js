$(async function () {
    await fetch(`/favorites`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify({
            isDetailed: true
        })
    })
        .then(async (res) => {
            await res.json()
                .then((data) => {
                    if (!data.favList.length) {
                        $('.favorites_content').append('<div class="no_favorites">Список избранного пуст</div>');
                    } else {
                        let favIdList = []
                        for (const product of data.favList) {
                            favIdList.push(product.vendorcode);
                        }
                        for (const product of data.favList) {
                            addProduct(product, 'favorites_content', true, favIdList);
                        }
                    }
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
})