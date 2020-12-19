'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
function format(num) {
    var r = '0'
    if (!isNaN(num)) {
        num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
        num = num.split('').reverse().join('').replace(/^[\.]/, '');
        r = num;
    }
    return r;
}

module.exports = {
    async find(ctx) {
        console.log(ctx);
        let entities;
        if (ctx.query._q) {
          entities = await strapi.services.categoria.search(ctx.query);
        } else {
          entities = await strapi.services.categoria.find(ctx.query);
        }
        console.log(entities);
        return entities
            .map(entity => sanitizeEntity(entity, { model: strapi.models.categoria }))
            .map(entity => {
                    return {
                        id : entity.id,
                        nombre : entity.Nombre,
                        producto : !!entity.productos?entity.productos.length:0
                    }
                }
            )
            .filter(entity => entity.producto>0)
            ;
    },
    async findOne(ctx) {
        const { id } = ctx.params;
        console.log(id);
        const entity = await strapi.services.categoria.findOne({ id });
        var categoria = sanitizeEntity(entity, { model: strapi.models.categoria });
        delete categoria.published_at;
        delete categoria.created_at;
        delete categoria.updated_at;
        categoria.productos = categoria.productos.map( producto => {
            return {
                id: producto.id,
                titulo: producto.titulo,
                precio: format(producto.precio),
                descripcion: producto.descripcion,
                destacado: producto.destacado,
                alternativeText: producto.imagen.alternativeText,
                thumbnail: producto.imagen.formats.thumbnail.url,
                imagen: producto.imagen.url
            }
        });
        return categoria;
    },
};
