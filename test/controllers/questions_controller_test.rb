require "test_helper"

class QuestionsControllerTest < ActionDispatch::IntegrationTest
  test "should get home" do
    get questions_home_url
    assert_response :success
  end
end
