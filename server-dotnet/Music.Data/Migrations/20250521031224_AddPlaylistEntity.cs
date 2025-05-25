using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Music.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddPlaylistEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_songs_singers_SingerId",
                table: "songs");

            migrationBuilder.DropForeignKey(
                name: "FK_SongUser_songs_SongsId",
                table: "SongUser");

            migrationBuilder.DropForeignKey(
                name: "FK_SongUser_users_UsersId",
                table: "SongUser");

            migrationBuilder.DropPrimaryKey(
                name: "PK_users",
                table: "users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_songs",
                table: "songs");

            migrationBuilder.DropPrimaryKey(
                name: "PK_singers",
                table: "singers");

            migrationBuilder.RenameTable(
                name: "users",
                newName: "Users");

            migrationBuilder.RenameTable(
                name: "songs",
                newName: "Songs");

            migrationBuilder.RenameTable(
                name: "singers",
                newName: "Singers");

            migrationBuilder.RenameIndex(
                name: "IX_songs_SingerId",
                table: "Songs",
                newName: "IX_Songs_SingerId");

            migrationBuilder.AddColumn<int>(
                name: "PlaylistId",
                table: "Songs",
                type: "int",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Users",
                table: "Users",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Songs",
                table: "Songs",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Singers",
                table: "Singers",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Playlists",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Playlists", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Songs_PlaylistId",
                table: "Songs",
                column: "PlaylistId");

            migrationBuilder.AddForeignKey(
                name: "FK_Songs_Playlists_PlaylistId",
                table: "Songs",
                column: "PlaylistId",
                principalTable: "Playlists",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Songs_Singers_SingerId",
                table: "Songs",
                column: "SingerId",
                principalTable: "Singers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SongUser_Songs_SongsId",
                table: "SongUser",
                column: "SongsId",
                principalTable: "Songs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SongUser_Users_UsersId",
                table: "SongUser",
                column: "UsersId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Songs_Playlists_PlaylistId",
                table: "Songs");

            migrationBuilder.DropForeignKey(
                name: "FK_Songs_Singers_SingerId",
                table: "Songs");

            migrationBuilder.DropForeignKey(
                name: "FK_SongUser_Songs_SongsId",
                table: "SongUser");

            migrationBuilder.DropForeignKey(
                name: "FK_SongUser_Users_UsersId",
                table: "SongUser");

            migrationBuilder.DropTable(
                name: "Playlists");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Users",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Songs",
                table: "Songs");

            migrationBuilder.DropIndex(
                name: "IX_Songs_PlaylistId",
                table: "Songs");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Singers",
                table: "Singers");

            migrationBuilder.DropColumn(
                name: "PlaylistId",
                table: "Songs");

            migrationBuilder.RenameTable(
                name: "Users",
                newName: "users");

            migrationBuilder.RenameTable(
                name: "Songs",
                newName: "songs");

            migrationBuilder.RenameTable(
                name: "Singers",
                newName: "singers");

            migrationBuilder.RenameIndex(
                name: "IX_Songs_SingerId",
                table: "songs",
                newName: "IX_songs_SingerId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_users",
                table: "users",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_songs",
                table: "songs",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_singers",
                table: "singers",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_songs_singers_SingerId",
                table: "songs",
                column: "SingerId",
                principalTable: "singers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SongUser_songs_SongsId",
                table: "SongUser",
                column: "SongsId",
                principalTable: "songs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SongUser_users_UsersId",
                table: "SongUser",
                column: "UsersId",
                principalTable: "users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
