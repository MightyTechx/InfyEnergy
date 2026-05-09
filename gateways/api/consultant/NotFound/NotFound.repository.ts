import { prisma } from '@infyenergy/database';
import { BaseRepository } from '@infyenergy/core/repository';
import { CreateNotFoundDto, UpdateNotFoundDto } from './NotFound.dto';
import { ConsultantNotFound, PrismaClient } from '@prisma/client';

/**
 * Repository for ConsultantNotFound entity
 * Handles all data access operations with type-safe Prisma queries
 */
export class NotFoundRepository extends BaseRepository<
  ConsultantNotFound,
  CreateNotFoundDto,
  UpdateNotFoundDto
> {
  private _prisma: PrismaClient | null = null;

  constructor() {
    super({} as PrismaClient);
  }

  private async getPrisma(): Promise<PrismaClient> {
    if (!this._prisma) {
      this._prisma = await prisma;
    }
    return this._prisma;
  }

  async create(data: CreateNotFoundDto): Promise<ConsultantNotFound> {
    const db = await this.getPrisma();
    return db.consultantNotFound.create({ data });
  }

  async findAll(): Promise<ConsultantNotFound[]> {
    const db = await this.getPrisma();
    return db.consultantNotFound.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async findById(id: string): Promise<ConsultantNotFound | null> {
    const db = await this.getPrisma();
    return db.consultantNotFound.findUnique({ where: { id } });
  }

  async update(id: string, data: UpdateNotFoundDto): Promise<ConsultantNotFound> {
    const db = await this.getPrisma();
    return db.consultantNotFound.update({ where: { id }, data });
  }

  async delete(id: string): Promise<ConsultantNotFound> {
    const db = await this.getPrisma();
    return db.consultantNotFound.delete({ where: { id } });
  }
}
