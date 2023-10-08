export const schemaTextGenerator = (): string => {
    return `
        import { archiveSchema, listSchema } from 'src/common/helpers/validator.schemas'
        
        function getUpsertSchema(type: string) {
            const schema = {
                type: 'object',
                required: ['data'],
                additionalProperties: false,
                properties: {
                    data: {
                        type: 'object',
                        required: type === 'update' ? ['id'] : ['name'],
                        additionalProperties: false,
                        properties: {
                            id: { type: 'integer' },
                            name: { type: 'string', sanitize: (data) => data.substring(0, 50) },
                        },
                    },
                },
            }
        
            if (type === 'update') {
                schema.properties.data.properties['id'] = { type: 'integer' }
            }
            return schema
        }
        
        export default {
            insert: getUpsertSchema('insert'),
            update: getUpsertSchema('update'),
            archive: archiveSchema,
            portalList: listSchema,
        }    
    `
}
