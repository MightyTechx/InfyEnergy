import { prisma } from '@infyenergy/database';
import { BaseRepository } from '@infyenergy/core/repository';
import { CreateNotFoundDto, UpdateNotFoundDto } from './NotFound.dto';
import { UserNotFound, PrismaClient } from '@prisma/client';

/**
 * Repository for UserNotFound entity
 * Handles all data access operations with type-safe Prisma queries
 */
export class NotFoundRepository extends BaseRepository<
  UserNotFound,
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

  async create(data: CreateNotFoundDto): Promise<UserNotFound> {
    const db = await this.getPrisma();
    return db.userNotFound.create({ data });
  }

  async findAll(): Promise<UserNotFound[]> {
    const db = await this.getPrisma();
    return db.userNotFound.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async findById(id: string): Promise<UserNotFound | null> {
    const db = await this.getPrisma();
    return db.userNotFound.findUnique({ where: { id } });
  }

  async update(id: string, data: UpdateNotFoundDto): Promise<UserNotFound> {
    const db = await this.getPrisma();
    return db.userNotFound.update({ where: { id }, data });
  }

  async delete(id: string): Promise<UserNotFound> {
    const db = await this.getPrisma();
    return db.userNotFound.delete({ where: { id } });
  }
}
