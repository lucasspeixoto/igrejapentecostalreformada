/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import type { MonthlyTotalCategory } from '../../../domain/models/finance-reports.model';

@Injectable({
  providedIn: 'root',
})
export class ExcelService<T> {
  public exportToExcel(data: T[], fileName: string = 'relatorio'): void {
    // Convert JSON data to worksheet
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

    // Create workbook
    const workbook: XLSX.WorkBook = {
      Sheets: { Data: worksheet },
      SheetNames: ['Data'],
    };

    // Generate Excel buffer
    const excelBuffer: ArrayBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    // Create Blob
    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    // Trigger download using plain browser API
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = `${fileName}.xlsx`;
    link.click();
    URL.revokeObjectURL(url);
  }

  public exportToExcelMonthlyTotalByCategory(data: MonthlyTotalCategory[], year: number): void {
    // 1. Definir os Cabeçalhos das Colunas
    const headers = [
      'Categoria',
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
      'Total',
    ];

    const rows = data.map(item => {
      return [
        item.name, // Coluna 1: Categoria
        ...item.months, // Colunas 2 a 13: Espalha o array de meses
        item.totalYear, // Coluna 14: Total
      ];
    });

    // 3. Combinar cabeçalho e linhas em uma única matriz (Array of Arrays)
    const worksheetData = [headers, ...rows];

    // 4. Criar a planilha (Worksheet)
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    // Opcional: Ajustar largura das colunas para ficar visualmente melhor
    const wscols = [
      { wch: 25 }, // Largura da coluna "Categoria"
      { wch: 10 }, // Jan
      { wch: 10 }, // Fev
      { wch: 10 }, // ...
      { wch: 10 },
      { wch: 10 },
      { wch: 10 },
      { wch: 10 },
      { wch: 10 },
      { wch: 10 },
      { wch: 10 },
      { wch: 10 },
      { wch: 10 }, // Dez
      { wch: 12 }, // Total
    ];
    worksheet['!cols'] = wscols;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Distribuição por Categoria');

    XLSX.writeFile(workbook, `Relatório Distribuição Mensal por Categoria - ${year}.xlsx`);
  }
}
