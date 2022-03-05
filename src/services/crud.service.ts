import { Injectable } from '@nestjs/common';
import { Document, FilterQuery, Model } from 'mongoose';
import { DocumentNotFoundError } from './repository.service';

@Injectable()
export class CrudService<DOC extends Document> {
    constructor(protected readonly Model: Model<DOC>) {}

    async create(createDto: any): Promise<DOC> {
        return this.Model.create(createDto);
    }

    async find(filter: any): Promise<DOC[]> {
        return this.Model.find(filter);
    }

    async findByName(name: string): Promise<DOC> {
        return this.Model.findOne({ name: name } as FilterQuery<DOC>);
    }

    async findByProjectId(projectId: string): Promise<DOC[]> {
        return this.Model.find({ projectId: projectId } as FilterQuery<DOC>);
    }

    async findAll(): Promise<DOC[]> {
        return this.Model.find({});
    }

    async findOne(id: string): Promise<DOC> {
        return this.Model.findOne({ _id: id } as FilterQuery<DOC>, { __v: 0 });
    }

    async update(id: string, updateDto: Partial<DOC>): Promise<DOC> {
        const originalDocument = await this.load(id);
        Object.assign(originalDocument, updateDto);
        return originalDocument.save();
    }

    async load(id: string): Promise<DOC> {
        const document = this.findOne(id);

        if (document === null || document === undefined) {
            throw new DocumentNotFoundError(id, this.Model);
        }

        return document;
    }

    async remove(id: string): Promise<DOC> {
        return this.Model.remove({ _id: id });
    }
}
