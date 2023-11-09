export abstract class BaseRequestUseCase<RequestDto, ResponseDto> {
  abstract handle(req: RequestDto): Promise<ResponseDto>;
}
