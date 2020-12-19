'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async destacados(ctx) {
        let entities;
        entities = await strapi.query('productos').find({destacado:true}, [
            'imagen.formats.thumbnail.url',
            'imagen.alternativeText',
            'titulo',
            'precio',
            'descripcion',
            'destacado'
        ]);
        console.log(entities);
        return entities
            .map(entity => sanitizeEntity(entity, { model: strapi.models.productos }))
            .map(entity => {
                return {
                    titulo : entity.titulo,
                    precio : entity.precio,
                    descripcion : entity.descripcion,
                    thumbnail : entity.imagen.formats.thumbnail.url,
                    alternativeText : entity.imagen.alternativeText,
                }
            });
    },
};