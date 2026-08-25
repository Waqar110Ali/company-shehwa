import {
  Controller,
  Get,
  Param,
  Res,
  UseGuards, Inject } from "@nestjs/common";

import express from "express";

import {
  ReportsService,
} from "../services/reports.service";

import {
  ReportsExportService,
} from "../services/reports-export.service";

import {
  ReportsAccessGuard,
} from "../guards/reports-access.guard";

@Controller("reports")
@UseGuards(
  ReportsAccessGuard,
)
export class ReportsController {
  constructor(
    @Inject(ReportsService) private readonly reportsService: ReportsService,

    @Inject(ReportsExportService) private readonly reportsExportService: ReportsExportService,
  ) {}

  @Get()
  async getReports() {
    return this.reportsService.getReports();
  }

  @Get("export/:format")
  async exportReport(
    @Param("format")
    format: string,

    @Res()
    response: express.Response,
  ) {
    const normalized =
      format.toLowerCase();

    if (
      normalized ===
      "csv"
    ) {
      const buffer =
        await this.reportsExportService.csv();

      response.setHeader(
        "Content-Type",
        "text/csv",
      );

      response.setHeader(
        "Content-Disposition",
        'attachment; filename="reports.csv"',
      );

      return response.send(
        buffer,
      );
    }

    if (
      normalized ===
      "excel"
    ) {
      const buffer =
        await this.reportsExportService.excel();

      response.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      );

      response.setHeader(
        "Content-Disposition",
        'attachment; filename="reports.xlsx"',
      );

      return response.send(
        buffer,
      );
    }

    if (
      normalized ===
      "pdf"
    ) {
      const buffer =
        await this.reportsExportService.pdf();

      response.setHeader(
        "Content-Type",
        "application/pdf",
      );

      response.setHeader(
        "Content-Disposition",
        'attachment; filename="reports.pdf"',
      );

      return response.send(
        buffer,
      );
    }

    return response.status(
      400,
    ).json({
      message:
        "Unsupported export format.",
    });
  }
}