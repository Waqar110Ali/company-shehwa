import {
  Injectable, Inject } from "@nestjs/common";

import {
  ReportsRepository,
} from "../repositories/reports.repository";

@Injectable()
export class ReportsService {
  constructor(
    @Inject(ReportsRepository) private readonly reportsRepository: ReportsRepository,
  ) {}

  async getReports() {
    return this.reportsRepository.getReports();
  }
}