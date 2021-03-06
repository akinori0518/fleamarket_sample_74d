require 'rails_helper'
describe Card do
  describe 'Cardモデルの単体テスト' do
    
    context '登録成功パターン' do

      example "カードID、顧客ID、ユーザーIDがあれば登録できる" do
        user = create(:user)
        card = build(:card)
        card.valid?
        expect(card).to be_valid
      end

    end

    context '登録失敗パターン' do

      example "card_idが空の場合、登録できない" do
        user = create(:user)
        card = build(:card, card_id: nil)
        card.valid?
        expect(card.errors[:card_id]).to include("を入力してください")
      end

      example "customer_idが空の場合、登録できない" do
        user = create(:user)
        card = build(:card, customer_id: nil)
        card.valid?
        expect(card.errors[:customer_id]).to include("を入力してください")
      end

      example "user_idが空の場合、登録できない" do
        user = create(:user)
        card = build(:card, user_id: nil)
        card.valid?
        expect(card.errors[:user_id]).to include("を入力してください")
      end

      example "ユーザーが存在しない場合、登録できない" do
        card = build(:card)
        card.valid?
        expect(card.errors[:user]).to include("を入力してください")
      end

    end
  end
end