module.exports = function(template, product) {
        let output = template.replace("{{id}}", product.id);
        output = output.replace("{{Name}}", product.name);
        output = output.replace("{{Description}}", product.description);
        output = output.replace("{{Price}}", product.price);
        output = output.replace("{{Category}}", product.category);
        output = output.replace("{{Stock}}", product.stock);
        output = output.replace("{{Rating}}", product.rating);
        output = output.replace("{{%ID%}}", product.id);
        output = output.replace("{{%IMG%}}", product.img);
        return output;
    };
    