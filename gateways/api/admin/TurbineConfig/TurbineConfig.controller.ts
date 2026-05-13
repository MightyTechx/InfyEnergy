import { Request, Response } from 'express';

export class TurbineConfigController {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private prismaPromise: any) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private async db(): Promise<any> {
    return await this.prismaPromise;
  }

  // ─── Turbine Types ─────────────────────────────────────────────────────────────

  getTurbineTypes = async (_req: Request, res: Response): Promise<void> => {
    const db = await this.db();
    const types = await db.turbineType.findMany({
      include: { _count: { select: { parameters: true } } },
      orderBy: { name: 'asc' },
    });
    res.json({ data: types, message: 'Turbine types retrieved' });
  };

  getTurbineType = async (req: Request, res: Response): Promise<void> => {
    const db = await this.db();
    const { id } = req.params;
    const type = await db.turbineType.findUnique({
      where: { id },
      include: {
        parameters: { orderBy: [{ category: 'asc' }, { displayOrder: 'asc' }] },
      },
    });
    if (!type) {
      res.status(404).json({ message: 'Turbine type not found' });
      return;
    }
    res.json({ data: type, message: 'Turbine type retrieved' });
  };

  createTurbineType = async (req: Request, res: Response): Promise<void> => {
    const { name, manufacturer, ratedPower, rotorDiameter, hubHeight } = req.body;

    if (!name?.trim() || !manufacturer?.trim() || ratedPower === undefined) {
      res.status(400).json({ message: 'Name, manufacturer, and rated power are required' });
      return;
    }

    const db = await this.db();
    const type = await db.turbineType.create({
      data: {
        name: name.trim(),
        manufacturer: manufacturer.trim(),
        ratedPower: parseFloat(ratedPower),
        rotorDiameter: rotorDiameter ? parseFloat(rotorDiameter) : null,
        hubHeight: hubHeight ? parseFloat(hubHeight) : null,
      },
      include: { _count: { select: { parameters: true } } },
    });

    res.status(201).json({ data: type, message: 'Turbine type created' });
  };

  updateTurbineType = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, manufacturer, ratedPower, rotorDiameter, hubHeight } = req.body;

    const db = await this.db();
    const existing = await db.turbineType.findUnique({ where: { id } });

    if (!existing) {
      res.status(404).json({ message: 'Turbine type not found' });
      return;
    }

    const data: Record<string, unknown> = {};
    if (name !== undefined) data.name = name;
    if (manufacturer !== undefined) data.manufacturer = manufacturer;
    if (ratedPower !== undefined) data.ratedPower = parseFloat(ratedPower);
    if (rotorDiameter !== undefined)
      data.rotorDiameter = rotorDiameter ? parseFloat(rotorDiameter) : null;
    if (hubHeight !== undefined) data.hubHeight = hubHeight ? parseFloat(hubHeight) : null;

    const type = await db.turbineType.update({
      where: { id },
      data,
      include: { _count: { select: { parameters: true } } },
    });

    res.json({ data: type, message: 'Turbine type updated' });
  };

  deleteTurbineType = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const db = await this.db();
    await db.turbineType.delete({ where: { id } });
    res.json({ message: 'Turbine type deleted' });
  };

  // ─── Parameters ───────────────────────────────────────────────────────────────

  getParameters = async (req: Request, res: Response): Promise<void> => {
    const { typeId } = req.params;
    const { category } = req.query;

    const db = await this.db();
    const where: Record<string, unknown> = { turbineTypeId: typeId };
    if (category && category !== 'all') where.category = category;

    const parameters = await db.turbineParameter.findMany({
      where,
      orderBy: [{ category: 'asc' }, { displayOrder: 'asc' }],
    });

    res.json({ data: parameters, message: 'Parameters retrieved' });
  };

  createParameter = async (req: Request, res: Response): Promise<void> => {
    const { typeId } = req.params;
    const {
      key,
      label,
      category,
      unit,
      dataType,
      minValue,
      maxValue,
      warningMin,
      warningMax,
      criticalMin,
      criticalMax,
      chartEnabled,
      dashboardVisible,
      alertEnabled,
      alertSeverity,
      color,
      scadaMapping,
      displayOrder,
    } = req.body;

    if (!key?.trim() || !label?.trim() || !category || !unit) {
      res.status(400).json({ message: 'Key, label, category, and unit are required' });
      return;
    }

    const db = await this.db();
    const type = await db.turbineType.findUnique({ where: { id: typeId } });
    if (!type) {
      res.status(404).json({ message: 'Turbine type not found' });
      return;
    }

    const param = await db.turbineParameter.create({
      data: {
        turbineTypeId: typeId,
        key: key.trim(),
        label: label.trim(),
        category,
        unit: unit.trim(),
        dataType: dataType || 'number',
        minValue: minValue !== undefined ? parseFloat(minValue) : null,
        maxValue: maxValue !== undefined ? parseFloat(maxValue) : null,
        warningMin: warningMin !== undefined ? parseFloat(warningMin) : null,
        warningMax: warningMax !== undefined ? parseFloat(warningMax) : null,
        criticalMin: criticalMin !== undefined ? parseFloat(criticalMin) : null,
        criticalMax: criticalMax !== undefined ? parseFloat(criticalMax) : null,
        chartEnabled: chartEnabled !== false,
        dashboardVisible: dashboardVisible !== false,
        alertEnabled: alertEnabled !== false,
        alertSeverity: alertSeverity || 'warning',
        color: color || null,
        scadaMapping: scadaMapping?.trim() || null,
        displayOrder: displayOrder !== undefined ? parseInt(displayOrder) : 0,
      },
    });

    res.status(201).json({ data: param, message: 'Parameter created' });
  };

  updateParameter = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const db = await this.db();
    const existing = await db.turbineParameter.findUnique({ where: { id } });

    if (!existing) {
      res.status(404).json({ message: 'Parameter not found' });
      return;
    }

    const data: Record<string, unknown> = {};
    const fields = [
      'key',
      'label',
      'category',
      'unit',
      'dataType',
      'minValue',
      'maxValue',
      'warningMin',
      'warningMax',
      'criticalMin',
      'criticalMax',
      'chartEnabled',
      'dashboardVisible',
      'alertEnabled',
      'alertSeverity',
      'color',
      'scadaMapping',
      'displayOrder',
    ];

    for (const field of fields) {
      if (req.body[field] !== undefined) {
        const val = req.body[field];
        if (typeof val === 'string' && field.includes('Value') && field !== 'dataType') {
          data[field] = val === '' ? null : parseFloat(val);
        } else if (
          field === 'scadaMapping' ||
          field === 'key' ||
          field === 'label' ||
          field === 'unit'
        ) {
          data[field] = val?.trim() ?? null;
        } else {
          data[field] = val;
        }
      }
    }

    const param = await db.turbineParameter.update({ where: { id }, data });
    res.json({ data: param, message: 'Parameter updated' });
  };

  deleteParameter = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const db = await this.db();
    await db.turbineParameter.delete({ where: { id } });
    res.json({ message: 'Parameter deleted' });
  };

  // ─── Schema ───────────────────────────────────────────────────────────────────

  getSchema = async (_req: Request, res: Response): Promise<void> => {
    res.json({
      data: {
        categories: ['electrical', 'mechanical', 'environmental', 'operational'],
        dataTypes: ['number', 'boolean', 'enum'],
        alertSeverities: ['warning', 'critical'],
      },
      message: 'Schema retrieved',
    });
  };
}
