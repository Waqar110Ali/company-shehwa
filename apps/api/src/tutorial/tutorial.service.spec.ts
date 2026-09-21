import { Test } from "@nestjs/testing";
import { TutorialService } from "./services/tutorial.service";
import { TutorialRepository } from "./repositories/tutorial.repository";

describe("TutorialService", () => {
  let service: TutorialService;

  const mockRepository = {
    findUserByEmail: jest.fn(async (email: string) => null),
    createUser: jest.fn(async (payload) => ({
      ...payload,
      _id: "user_123",
      createdAt: new Date(),
      updatedAt: new Date(),
    })),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const moduleRef = await Test.createTestingModule({
      providers: [
        TutorialService,
        {
          provide: TutorialRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = moduleRef.get<TutorialService>(TutorialService);
  });

  it("should create a tutorial user profile and default balance", async () => {
    const user = await service.createTutorialUser({
      fullName: "Ali Khan",
      email: "ali@example.com",
      phone: "03001234567",
      city: "Lahore",
    });

    expect(mockRepository.createUser).toHaveBeenCalledWith(
      expect.objectContaining({
        fullName: "Ali Khan",
        email: "ali@example.com",
        phone: "03001234567",
        city: "Lahore",
        coins: 0,
        status: "pending",
      }),
    );

    expect(user).toMatchObject({
      success: true,
      data: expect.objectContaining({
        fullName: "Ali Khan",
        email: "ali@example.com",
        phone: "03001234567",
        city: "Lahore",
      }),
    });
  });
});
