import AuditLog from '../models/AuditLog';

export const logAction = async (
  action: string,
  userId: string | undefined,
  resourceId: string | undefined,
  ipAddress: string,
  details: any = {}
) => {
  try {
    await AuditLog.create({
      action,
      userId,
      resourceId,
      ipAddress,
      details,
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Failed to create audit log:', error);
  }
};
