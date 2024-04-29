import { Sanction } from '../../common';
import { SanctionModel } from '../../database/models';
import { ICreateSanctionDto } from './dto/create.dto';

export class SanctionsService {
  async getSanctions(): Promise<Sanction[]> {
    return await SanctionModel.find();
  }

  async getSanction(id: string, set: any): Promise<Sanction> {
    const sanction = await SanctionModel.findById({ _id: id });

    if (!sanction) {
      set.status = 404;
      throw new Error('Sanction not found');
    }

    return sanction as Sanction;
  }

  async createSanction(body: ICreateSanctionDto): Promise<void> {
    await SanctionModel.create(body);
  }

  async deleteSanction(id: string): Promise<void> {
    await SanctionModel.findOneAndDelete({ _id: id });
  }
}
