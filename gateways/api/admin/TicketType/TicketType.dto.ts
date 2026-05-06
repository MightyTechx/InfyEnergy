/**
 * TicketType DTO - Re-exports shared validation schemas
 * Validation logic is centralized in @infyenergy/interfaces (using Yup)
 */
export {
  CreateTicketTypeSchema,
  UpdateTicketTypeSchema,
  TicketTypeIdSchema,
  type CreateTicketTypeDto,
  type UpdateTicketTypeDto,
  type TicketTypeResponseDto,
} from '@infyenergy/interfaces';
