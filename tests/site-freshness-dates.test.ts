import { describe, expect, it } from "vitest";
import { PF_REVIEWED_ISO } from "@/lib/config/pf";
import {
  PF_MODEL_LAST_UPDATED,
  PF_MODEL_LAST_UPDATED_ISO,
  SITE_CONTENT_LAST_UPDATED,
  SITE_CONTENT_LAST_UPDATED_ISO,
} from "@/lib/config/site-freshness";
import { ROUTES } from "@/lib/routes";
import { generateInHandSalaryModel } from "@/lib/growth/in-hand-salary-model";

describe("site freshness date separation", () => {
  it("keeps July 2026 content review distinct from October 2026 PF model revision", () => {
    expect(SITE_CONTENT_LAST_UPDATED).toBe("July 2026");
    expect(SITE_CONTENT_LAST_UPDATED_ISO).toBe("2026-07-01");
    expect(PF_MODEL_LAST_UPDATED_ISO).toBe(PF_REVIEWED_ISO);
    expect(PF_MODEL_LAST_UPDATED_ISO).toBe("2026-10-14");
    expect(PF_MODEL_LAST_UPDATED).toBe("14 October 2026");
    expect(SITE_CONTENT_LAST_UPDATED_ISO).not.toBe(PF_MODEL_LAST_UPDATED_ISO);
  });

  it("homepage report route and model scenario count stay aligned for promo copy", () => {
    expect(ROUTES.inHandSalaryModelReport).toBe("/reports/india-in-hand-salary-model-2026");
    const model = generateInHandSalaryModel();
    expect(model.salaryLevelRows).toHaveLength(72);
  });
});
