"""empty message

Revision ID: 660d3ea1b497
Revises: 
Create Date: 2024-11-21 01:02:33.993293

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '660d3ea1b497'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('art_bank',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('fileName', sa.String(length=40), nullable=False),
    sa.Column('imageUrl', sa.Text(), nullable=False),
    sa.Column('caption', sa.Text(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('fileName')
    )
    op.create_table('card_bank',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=True),
    sa.Column('filename', sa.String(length=40), nullable=False),
    sa.Column('url', sa.Text(), nullable=False),
    sa.Column('tags', sa.Text(), nullable=True),
    sa.Column('uploadedDate', sa.Date(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('filename'),
    sa.UniqueConstraint('url')
    )
    op.create_table('favorites',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('imageID', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('settings',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('tag_list',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('tagDescription', sa.String(length=50), nullable=False),
    sa.Column('tagCount', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('tagDescription')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=80), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('username')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user')
    op.drop_table('tag_list')
    op.drop_table('settings')
    op.drop_table('favorites')
    op.drop_table('card_bank')
    op.drop_table('art_bank')
    # ### end Alembic commands ###
