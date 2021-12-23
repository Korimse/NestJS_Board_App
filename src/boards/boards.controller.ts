import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
    private logger = new Logger('BoardsController');
    constructor(private boardsService: BoardsService) {}

    @Get()
    getAllBoard(
        @GetUser() user: User
    ): Promise<Board[]> {
        this.logger.verbose(`User ${user.username} trying to get all boards`);
        return this.boardsService.getAllBoards(user);
    }
    // @Get('/')
    // getAllBoard() {
    //     return this.boardsService.getAllBoards();
    // }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(
        @Body() createBoardDto: CreateBoardDto,
        @GetUser() user: User): Promise<Board> {
        this.logger.verbose(`User ${user.username} creating a new board. Payload: ${createBoardDto.title} `);
        return this.boardsService.createBoard(createBoardDto, user);
    }

    // @Post()
    // @UsePipes(ValidationPipe)
    // createBoard(@Body() createBoardDto: CreateBoardDto): Board {
    //     return this.boardsService.createBoard(createBoardDto);
    // }

    @Get('/:id')
    getBoardById(@Param('id') id: number): Promise<Board> {
        return this.boardsService.getBoardById(id);
    }
    // @Get('/:id')
    // getBoardById(@Param('id') id: string): Board {
    //     return this.boardsService.getBoardById(id);
    // }
    
    @Delete('/:id')
    deleteBoard(
        @Param('id', ParseIntPipe) id:number,
        @GetUser() user: User): Promise<void> {
        return this.boardsService.deleteBoard(id, user);
    }
    // @Delete('/:id')
    // deleteBoard(@Param('id') id: string): void {
    //     this.boardsService.deleteBoard(id);
    // }

    @Patch('/:id')
    updateBoardStatus(
        @Param('id') id:number,
        @Body('status') status: BoardStatus){
            return this.boardsService.updateBoardStatus(id, status);
        }

    // @Patch('/:id')
    // updateBoardStatus(@Param('id') id:string, @Body('status') status: BoardStatus): Board {
    //     return this.boardsService.updateBoardStatus(id, status);
    // }
}
