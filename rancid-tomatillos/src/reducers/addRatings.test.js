import { addRatingsReducer } from '../reducers/addratings';


describe('addRatingsReducer', () => {

  it('should have a default state', () => {
    const expected = [];
    const result = addRatingsReducer(undefined, {});

    expect(result).toEqual(expected);
  });

  it('should update state when type is UPDATE_RATINGS', () => {
    const mockRatings = [{ 
      id: 435,
      user_id: 6,
      movie_id: 1,
      rating: 1,
      created_at: "2020-01-06T20:46:43.774Z",
      updated_at: "2020-01-06T20:46:43.774Z"
    }];
    const mockAction = {
      type: 'UPDATE_RATINGS',
      ratings: mockRatings
    };
    const expected = mockRatings;
    const result = addRatingsReducer([], mockAction);

    expect(result).toEqual(expected);
  });

  it('should update state when the type is DELETE_RATING', () => {
    const mockRatings = [{
      id: 435,
      user_id: 6,
      movie_id: 1,
      rating: 1,
      created_at: "2020-01-06T20:46:43.774Z",
      updated_at: "2020-01-06T20:46:43.774Z"
    }];
    const mockAction = {
      type: 'DELETE_RATING',
      ratingId: 435
    };
    const result = addRatingsReducer(mockRatings, mockAction);
    const expected = [];

    expect(result).toEqual(expected);
  })
})