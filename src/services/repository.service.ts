import { Injectable } from '@nestjs/common';
import { Document, FilterQuery, Model } from 'mongoose';

export class DocumentNotFoundError<DOC> extends Error {
    constructor(
    public readonly id: string,
    public readonly resource: Model<DOC>,
    ) {
        super(`${resource.name} document with id ${id} does not exists`);
    }
}

@Injectable()
export class CrudService<DOC extends Document> {
    constructor(private Model: Model<DOC>) {}

    async create(createDto: any): Promise<DOC> {
        return this.Model.create(createDto);
    }

    async findByName(name: string): Promise<DOC> {
        return this.Model.findOne({ name } as FilterQuery<DOC>);
    }

    async findAll(): Promise<DOC[]> {
        return this.Model.find({});
    }

    async load(id: string): Promise<DOC> {
        const document = this.findOne(id);

        if (document === null || document === undefined) {
            throw new DocumentNotFoundError(id, this.Model);
        }

        return document;
    }

    async findOne(id: string): Promise<DOC> {
        return this.Model.findOne({ _id: id } as FilterQuery<DOC>, { __v: 0 });
    }

    async update(id: string, updateDto: Partial<DOC>): Promise<DOC> {
        const originalDocument = await this.load(id);
        Object.assign(originalDocument, updateDto);
        return originalDocument.save();
    }

    async remove(id: string): Promise<DOC> {
        return this.Model.remove({ _id: id });
    }
}
