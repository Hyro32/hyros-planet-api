import { Sanction } from '../../common';
import { SanctionModel } from '../../database/models';

export class SanctionsService {
  async getSanctions(): Promise<Sanction[]> {
    return await SanctionModel.find();
  }

  async getSanction(id: number): Promise<Sanction | null> {
    return await SanctionModel.findById(id);
  }

  async createSanction(body: Sanction): Promise<void> {
    await SanctionModel.create(body);
  }

  async updateSanction(id: number, body: Sanction): Promise<void> {
    await SanctionModel.findOneAndUpdate({ id }, body);
  }

  async deleteSanction(id: number): Promise<void> {
    await SanctionModel.findOneAndDelete({ id });
  }
}
