
import { AxiosError, HttpStatusCode } from "axios";
import { isAxiosError, isAxiosUnprocessableEntityError } from "src/utils/utils";
import { describe, it, expect } from "vitest";

// describe dùng để Mô tả tập hợp các ngữ cảnh hoặc đơn vị cần test: Ví dụ function, component
describe('isAxiosError', () => {
  // it dùng để ghi chú trường hợp cần test
  it('isAxiosError trả về boolean', () => {
    // expect dùng để mong đợi giá trị trả về
    expect(isAxiosError(new Error())).toBe(false)
    expect(isAxiosError(new AxiosError())).toBe(true)
  })
})

describe("isAxiosUnprocessableEntityError", () => {
  it("isAxiosUnprocessableEntityError trả về boolean", () => {
    expect(isAxiosUnprocessableEntityError(new Error())).toBe(false);
    expect(isAxiosUnprocessableEntityError(
      new AxiosError(undefined, undefined, undefined, undefined, {
        status: HttpStatusCode.InternalServerError,
        data: null
      } as any))).toBe(false);
    expect(isAxiosUnprocessableEntityError(
      new AxiosError(undefined, undefined, undefined, undefined, {
        status: HttpStatusCode.UnprocessableEntity,
        data: null
      } as any))).toBe(true);
  })
})