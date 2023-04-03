RSpec.describe "Tracks", type: :request do
    describe "Get /index" do
        
        get api_track_path
        # expect(response).to have_http_status(:ok)
    end
end